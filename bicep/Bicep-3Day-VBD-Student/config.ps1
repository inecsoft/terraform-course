#Get the runtime parameters from the user.  You will need to change the "uniqueName" for each user to avoid clashes
param (
    [Bool]$dologin = $true,
    [String]$subName = "Customer",
    [String]$uniqueNameOverride = ""
)

$VerbosePreference = "Continue"

#############
# Functions #
#############

# This function prompts the user for a value and returns the trimmed version of the input.
# It removes any leading or trailing whitespace from the user's input.
function Get-TrimmedValue {
    param (
        [String]$prompt
    )

    $value = Read-Host $prompt
    $trimmedValue = $value.Trim()

    Write-Verbose "Value entered: $value, Trimmed to: $trimmedValue"

    if ([string]::IsNullOrWhiteSpace($trimmedValue)) {
        Write-Error "Value cannot be null or empty. Please try again."
        return ""
    } 

    return $trimmedValue
}

# This function checks if a resource or resource group exists in Azure.
function Test-ResourceExists {
    param (
        [String]$resourceGroupName,
        [String]$resourceName = ""
    )

    if ([string]::IsNullOrWhiteSpace($resourceGroupName)) {
        Write-Error "ERROR: Resource Group Name cannot be null or empty."
        return $false
    }

    if (-not [string]::IsNullOrWhiteSpace($resourceName)) {
        Write-Verbose "Checking if the resource '$resourceName' exists in the resource group '$resourceGroupName'..."
        Get-AzResource -resourceGroupName $resourceGroupName -resourceName $resourceName -ErrorAction SilentlyContinue -ErrorVariable notExist
        if ($notExist) {
            Write-Error "Resource '$resourceName' does not exist in resource group '$resourceGroupName'"
            return $false
        } else {
            Write-Verbose "Resource '$resourceName' exists in resource group '$resourceGroupName'"
            return $true
        }
    } else {
        Write-Verbose "Checking if the resource group '$resourceGroupName' exists..."
        Get-AzResource -resourceGroupName $resourceGroupName -ErrorAction SilentlyContinue -ErrorVariable notExist
        if ($notExist) {
            Write-Error "Resource Group '$resourceGroupName' does not exist."
            return $false
        } else {
            Write-Verbose "Resource Group '$resourceGroupName' exists."
            return $true
        }
    }
}


# This function prompts the user for a resource name and checks if it exists in a specified resource group.
# It continues to prompt the user until a valid resource name is provided.
function Test-ResourceLoop {
    param (
        [String]$prompt,    # The prompt message to display to the user
        [String]$rgName     # The name of the resource group to check
    )

    write-host "GOT $prompt AND $rgName"

    $valid = $false
    do {
        $resourceName = Get-TrimmedValue($prompt)    # Prompt the user for a resource name and get the trimmed value
        if ([string]::IsNullOrWhiteSpace($resourceName)) {
            Write-Error "ERROR: Resource Name cannot be null or empty."
        } else {
            if (Test-ResourceExists -resourceGroupName $rgName -resourceName $resourceName) {
                $valid = $true    # Set the flag to true if the resource exists in the resource group
            } else {
                Write-Error "ERROR: Resource '$resourceName' does not exist in resource group '$rgName'."
            }
        }
    } while ($valid -eq $false)    # Continue looping until a valid resource name is provided

    return $resourceName    # Return the validated resource name
}


##############################################
# Login and switch to the right subscription #
##############################################

#Login to azure (if required) - if you have already done this once, then it is unlikley you will need to do it again for the remainer of the session
if ($dologin) {
    Write-Host "Log in to Azure using an account with permission to read resources in the subscription" -ForegroundColor Green
    Connect-AzAccount -SubscriptionName $subName
} else {
    Write-Warning "Login skipped"
}

#check that the subscription name we are connected to matches the one we want and change it to the right one if not
Write-Host "Checking we are connected to the correct subscription (context)" -ForegroundColor Green
if ((Get-AzContext).Subscription.Name -ne $subName) {
    #they dont match so try and change the context
    Write-Warning "Changing context to subscription: $subName"
    $context = Set-AzContext -SubscriptionName $subName

    if ($context.Subscription.Name -ne $subName) {
        Write-Error "ERROR: Cannot change to subscription: $subName"
        exit 1
    }

    Write-Host "Changed context to subscription: $subName" -ForegroundColor Green
}

# Get the username of the person logged into this Azure context
$azureUserName = (Get-AzContext).Account.Id
Write-Output "Logged in as: $azureUserName"

##############################################
# Get and validate the config details        #
##############################################

if([string]::IsNullOrWhiteSpace($uniqueNameOverride)) {
    # get everything before the @ symbol
    $uniqueName = $azureUserName.Split("@")[0]

    #remove any periods
    $uniqueName = $uniqueName.Replace(".", "")

    #Shorten string to a maximum of 6 characters.  Take into account that there may be less than 6 characters
    $uniqueName = $uniqueName.Substring(0, [math]::Min(6, $uniqueName.Length))

} else {
    $uniqueName = $uniqueNameOverride.Substring(0, 6)
}

# Check if the uniqueName is empty
if ([string]::IsNullOrWhiteSpace($uniqueName)) {
    Write-Error "ERROR: uniqueName cannot be null or empty."
    exit 1
}

# Network address details
$networkAddress = Read-Host "Enter the network address (CIDR)"
$validCIDR = $false

# Validate the network address
while (-not $validCIDR) {
    if ($networkAddress -match '^(\d{1,3}\.){3}\d{1,3}/\d{1,2}$') {
        $validCIDR = $true
    } else {
        Write-Error "Invalid network address. Please enter a valid CIDR."
        exit 1
    }
}

#############################################
# Hub Details                               #
#############################################

# check the Hub RG details
$valid = $false
do {
    $hubRG = Get-TrimmedValue("Enter the HUB resource group name")
    if ([string]::IsNullOrWhiteSpace($hubRG)) {
        Write-Error "ERROR: Resource Group Name cannot be null or empty."
        
    } else {
        if (Test-ResourceExists -resourceGroupName $hubRG) {
            $valid = $true
        } else {
            Write-Error "ERROR: Resource Group '$hubRG' does not exist."
        }
    }
} while ($valid -eq $false)

#Check the Hub VNET details
$vnetName = Test-ResourceLoop "Enter the HUB vnet name" $hubRG 
#$vaultName = Test-ResourceLoop "Enter the HUB key vault name" $hubRG 

#############################################
# Firewall Details                          #
#############################################

# check the Firewall RG details
$valid = $false
do {
    $fwRG = Get-TrimmedValue("Enter the Firewall resource group name")
    if ([string]::IsNullOrWhiteSpace($fwRG)) {
        Write-Error "ERROR: Resource Group Name cannot be null or empty."
        
    } else {
        if (Test-ResourceExists -resourceGroupName $fwRG) {
            $valid = $true
        } else {
            Write-Error "ERROR: Resource Group '$fwRG' does not exist."
        }
    }
} while ($valid -eq $false)

$fwName = Test-ResourceLoop "Enter the Firewall name" $fwRG

########################
# Write out the config #
########################

Write-Verbose "Writing data to config file (JSON Format)"
# Write all the variables to a file in CSV format
$configFilePath = "config.json"

# Create a hash table to store the config variables
$configHash = @{}

# Add the variables to the hash table
$configHash["subscription"] = $subName
$configHash["location"] = 'uksouth'
$configHash["localEnv"] = 'dev'
$configHash["uniqueName"] = $uniqueName
$configHash["networkAddress"] = $networkAddress
$configHash["hubRG"] = $hubRG
$configHash["vnetName"] = $vnetName
#$configHash["vaultName"] = $vaultName
$configHash["fwRG"] = $fwRG
$configHash["fwName"] = $fwName

# Convert the hash table to JSON format
try {
    $configJson = $configHash | ConvertTo-Json
} catch {
    Write-Error "Failed to convert hash table to JSON format: $_"
    exit 1
}

try {
    # Write the JSON string to the file
    $configJson | Out-File -FilePath $configFilePath -Encoding UTF8
    Write-Host "Config variables written to $configFilePath"
} catch {
    Write-Error "Failed to write config variables to file: $_"
    exit 1
}

Write-Output "Config successfully written to $configFilePath"