<#
.SYNOPSIS
Deploys the bicep code to the subscription.

.DESCRIPTION
This script deploys all the required code necessary in order to deploy the fully working AVD.  this includes:
- Diagnostics
- Infrastructure
- Hosts

It is also responsible for adding a user to the Application Group and changing the name of the remote desktop.
#>

#Deployment notes on IP addressing
#Use the 10 address range and make sure it does not clash with the AADDS, AVD or HUB address ranges
#Typically each one uses:
#Entra DS   10.99.1.0/24    (The Entra DS deployment)
#AVD        10.140.0.0/24   (The students AVD deployment)
#HUB        10.140.1.0/24   (The HUB, includes KV, firewall etc.)
#FullVM     10.140.2.0/24   (VM and VMSS workload - full deployment)
#FullAVD    10.140.3.0/24   (AVD workload - full deployment)
#Students   10.141.n.0/24   1-20 - student deployments

#Get the runtime parameters from the user.  You will need to change the "uniqueName" for each user to avoid clashes
param (
    [String]$uniqueNameOverride = "",
    [String]$configFilePath = "../../config.json",
    [Bool]$dologin = $false,
    [Bool]$updateVault = $false
)

$VerbosePreference = "Continue"

###############################
# Read in the configuration   #
###############################

#Check if the config.json file exists
Write-Verbose "Checking if the config.json file exists..."
if (-not (Test-Path $configFilePath)) {
    Write-Error "The config.json file does not exist ($configFilePath)."
    exit 1
}

#Read the contents of the config.json file
Write-Verbose "Reading the contents of the config.json file..."
try {
    $configJson = Get-Content $configFilePath -Raw | ConvertFrom-Json
} catch {
    Write-Error "The config.json file is invalid."
    exit 1
}

Write-Output "Config loaded successfully"

#Set the subscription variable
$subName = $configJson.subscription
Write-Verbose "Subscription: $subName"

#Set the unique name variable
if(-not [string]::IsNullOrWhiteSpace($uniqueNameOverride)) {
    $uniqueName = $uniqueNameOverride.Substring(0, [math]::Min(6, $uniqueNameOverride.Length))
} else {
    $uniqueName = ($configJson.uniqueName).Substring(0, [math]::Min(6, ($configJson.uniqueName).Length))
}
Write-Verbose "Unique name: $uniqueName"

#Check the unique identifier is specified AND not more than 8 characters long
if (-not $uniqueName) {
    Write-Error "A unique identifier MUST be specified.  Always use the same identifier for EVERY deployment.  E.g. your username.  Max length 6 characters (or will be truncated)"
    Write-Output "e.g. ./deploy.ps1 -uiqueName 'name'"
    exit 1
}
if ($uniqueName.Length -gt 6) {
    Write-Error "Unique name greater than 6 characters, truncating to 6 characters"
    $uniqueName = $uniqueName.Substring(0, 6)
}

#Login to azure (if required) - if you have already done this once, then it is unlikley you will need to do it again for the remainer of the session
if ($dologin) {
    Write-Verbose "Log in to Azure using an account with permission to create Resource Groups and Assign Permissions"
    Connect-AzAccount -SubscriptionName $subName
} else {
    Write-Warning "Login skipped"
}

#check that the subscription name we are connected to matches the one we want and change it to the right one if not
Write-Verbose "Checking we are connected to the correct subscription (context)"
if ((Get-AzContext).Subscription.Name -ne $subName) {
    #they dont match so try and change the context
    Write-Warning "Changing context to subscription: $subName"
    $context = Set-AzContext -SubscriptionName $subName

    if ($context.Subscription.Name -ne $subName) {
        Write-Error "ERROR: Cannot change to subscription: $subName"
        exit 1
    }

    Write-Verbose "Changed context to subscription: $subName"
}

#Check to see if the Azure Firewall is in a running state
$fw = Get-AzFirewall -Name $configJson.fwName -ResourceGroupName $configJson.fwRG
if ($fw.ProvisioningState -ne "Succeeded") {
    Write-Error "ERROR: The Azure Firewall is not in a running state.  Please start the firewall before continuing"
    exit 1
}

#If we are updating the vault, get a secure password from the user for the Local VM Admin Password
if ($updateVault) {
    Write-Verbose "Getting the Local VM Admin Password from the user - vault will be updated"
    do {
        $localAdminPassword = Read-Host -AsSecureString "Set the local VM Admin Password"
        $securePassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($localAdminPassword))
        $valid = $securePassword -match "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$£!%*#?&])[A-Za-z\d@$£!%*#?&]{8,}$"
        if (-not $valid) {
            Write-Host "Invalid password. Password must be at least 8 characters long and contain at least one letter, one number, and one special character ($£!%*#?&)."
        }
    } until ($valid)
} else {
    Write-Verbose "Vault will not be updated - using existing password"
    #The Bicep needs a secure string regardless, so we need to give one, even if it is not going to be used as in this case.
    $localAdminPassword = ConvertTo-SecureString -String 'noupdate' -AsPlainText -Force

}

###########################
# DEPLOY Bicep Resources  #
###########################

#To understand the deployment of Bicep (or arm) resources you need to understand the concept of Resource Scope, of which there are 4:
#Resource Group Scope: This is the default scope for a Bicep. Resources like virtual machines, storage accounts, and databases are typically deployed at this scope
#Subscription Scope: This scope is used when you want to manage resources that apply to an entire subscription, such as policy assignments or budget or when you want to manage one or more Resource Groups
#Management Group Scope: This scope is used for setting policies and initiatives that apply to multiple subscriptions
#Tenant Scope: This is the highest level of scope and is used for deploying resources that apply across the entire Azure tenant, such as management groups.

#Bicep resources are deployed using the following commands depending on the scope of the deployment:
# New-AzTenantDeployment - fef: https://learn.microsoft.com/en-us/powershell/module/az.resources/new-aztenantdeployment
# New-AzManagementGroupDeployment - ref: https://learn.microsoft.com/en-us/powershell/module/az.resources/new-azmanagementgroupdeployment
# New-AzDeployment - ref: https://learn.microsoft.com/en-us/powershell/module/az.resources/new-azdeployment
# New-AzResourceGroupDeployment - ref: https://learn.microsoft.com/en-us/powershell/module/az.resources/new-azresourcegroupdeployment

#In this project we will be using the Subscription scope throughout.  This is because we are deploying resources that will exist in two separate Resource Groups using a single Bicep file to do this.
#It could also be done with two single Resource Group Deployments as well.

#If you wanted to deploy using Resource Group scope, then you would need to use Powershell to create a resource group to deploy to first.  This is not covered in this script.

#Deploy the "deploy.bicep" file in the Bicep folder using subscription scope:
Write-Verbose "Deploying main deploy.bicep ($PSScriptRoot)"
$deployOutput = New-AzDeployment -Name "$uniqueName-Deployment" `
            -Location $configJson.location `
            -TemplateFile "$($PSScriptRoot)/Bicep/deploy.bicep" `
            -Verbose `
            -TemplateParameterObject @{
                location=$configJson.location
                localEnv=$configJson.localEnv
                uniqueName=$configJson.uniqueName
            }

#Note the Sepcial case - secure strings need to be provided directly as parameters, cannot be added as a ParameterObject

if (-not $deployOutput) {
    Write-Error "ERROR: Failed to deploy $($PSScriptRoot)/deploy.bicep"
    exit 1
} else {
    #finished
    Write-Output "Finished Deployment"
}


