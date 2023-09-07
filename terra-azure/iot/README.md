![Terraform][terraform-version]

# Overview

Creates Azure iot with DevOps.

# Getting started

Running Terraform against Azure requires the Azure CLI. Visit this site to see how to [install](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) this on your system.

If you are running a console in a remote terminal then you will need to login to Azure using `az login`, and input the authorisation code into the following URL: https://aka.ms/devicelogin.

Before running Terraform, you need to export the ARM_ACCESS_KEY environment variable on your system.

Once installed initialse the repository with the version of Terraform at the top of this readme. (`terraform init`).



```
vim ~/.bashrc
export ARM_CLIENT_ID=""
export ARM_CLIENT_SECRET=""
export ARM_TENANT_ID=""
export ARM_SUBSCRIPTION_ID=""
```