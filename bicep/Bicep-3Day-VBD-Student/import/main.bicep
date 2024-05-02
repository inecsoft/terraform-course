@secure()
param storageAccounts_stbtccentralhubdev001_domainGuid string
param vaults_kv_btccentralhub_dev_name string = 'kv-btccentralhub-dev'
param storageAccounts_stbtccentralhubdev001_name string = 'stbtccentralhubdev001'
param ipGroups_ipg_btccentralhub_dev_uksouth_001_name string = 'ipg-btccentralhub-dev-uksouth-001'
param bastionHosts_bastion_btccentralhub_dev_uksouth_001_name string = 'bastion-btccentralhub-dev-uksouth-001'
param virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name string = 'vnet-btccentralhub-dev-uksouth-001'
param publicIPAddresses_pip_btccentralhub_dev_uksouth_001_name string = 'pip-btccentralhub-dev-uksouth-001'
param firewallPolicies_fwpol_btccentralhub_dev_uksouth_001_name string = 'fwpol-btccentralhub-dev-uksouth-001'
param azureFirewalls_firewall_btccentralhub_dev_uksouth_001_name string = 'firewall-btccentralhub-dev-uksouth-001'
param publicIPAddresses_pip_btccentralhub_fw_dev_uksouth_001_name string = 'pip-btccentralhub-fw-dev-uksouth-001'
param workspaces_law_BTCCentralHub_dev_uksouth_001_name string = 'law-BTCCentralHub-dev-uksouth-001'
param publicIPAddresses_pip_btccentralhub_fwman_dev_uksouth_001_name string = 'pip-btccentralhub-fwman-dev-uksouth-001'
param systemTopics_stbtccentralhubdev001_1fea29dc_09db_430c_a52d_e8d388aa4d8b_name string = 'stbtccentralhubdev001-1fea29dc-09db-430c-a52d-e8d388aa4d8b'
param virtualnetworks_vnet_entrads_manage_externalid string = '/subscriptions/7ce33444-28a1-4f52-a790-752850a1f32f/resourceGroups/rg-entradomainservices/providers/microsoft.network/virtualnetworks/vnet-entrads-manage'
param routeTables_abaa0838_cc71_439a_b80f_aca5979be2b6_externalid string = '/subscriptions/98af62d8-66b1-45e2-b13b-0fc34e175880/resourceGroups/rg-btccentralhub-dev-uksouth-001/providers/Microsoft.Network/routeTables/abaa0838-cc71-439a-b80f-aca5979be2b6'
param virtualNetworks_vnet_entrads_externalid string = '/subscriptions/7ce33444-28a1-4f52-a790-752850a1f32f/resourceGroups/RG-EntraDomainServices/providers/Microsoft.Network/virtualNetworks/vnet-entrads'
param virtualNetworks_vnet_avd_uksouth_dev_btc_externalid string = '/subscriptions/98af62d8-66b1-45e2-b13b-0fc34e175880/resourceGroups/rg-avd-uksouth-dev-btc/providers/Microsoft.Network/virtualNetworks/vnet-avd-uksouth-dev-btc'
param virtualNetworks_vnet_mike_infra_uksouth_dev_externalid string = '/subscriptions/98af62d8-66b1-45e2-b13b-0fc34e175880/resourceGroups/RG-BTC-MIKE-INFRA-UKSOUTH-DEV/providers/Microsoft.Network/virtualNetworks/vnet-mike-infra-uksouth-dev'

resource vaults_kv_btccentralhub_dev_name_resource 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: vaults_kv_btccentralhub_dev_name
  location: 'uksouth'
  tags: {
    Environment: 'dev'
    WorkloadName: 'BTCCentralHub'
    BusinessCriticality: 'medium'
    CostCentre: 'csu'
    Owner: 'Quberatron'
    DataClassification: 'general'
  }
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: 'b35feb2f-89e0-4372-ae59-6fe2e2bb2bc0'
    networkAcls: {
      bypass: 'AzureServices'
      defaultAction: 'Deny'
      ipRules: [
        {
          value: '82.71.111.109/32'
        }
      ]
      virtualNetworkRules: [
        {
          id: '${virtualnetworks_vnet_entrads_manage_externalid}/subnets/snet-entrads-manage-hosts'
          ignoreMissingVnetServiceEndpoint: false
        }
      ]
    }
    accessPolicies: []
    enabledForDeployment: true
    enabledForDiskEncryption: false
    enabledForTemplateDeployment: true
    enableSoftDelete: false
    softDeleteRetentionInDays: 90
    enableRbacAuthorization: true
    vaultUri: 'https://${vaults_kv_btccentralhub_dev_name}.vault.azure.net/'
    provisioningState: 'Succeeded'
    publicNetworkAccess: 'Enabled'
  }
}

resource firewallPolicies_fwpol_btccentralhub_dev_uksouth_001_name_resource 'Microsoft.Network/firewallPolicies@2023-09-01' = {
  name: firewallPolicies_fwpol_btccentralhub_dev_uksouth_001_name
  location: 'uksouth'
  tags: {
    Environment: 'dev'
    WorkloadName: 'BTCCentralHub'
    BusinessCriticality: 'medium'
    CostCentre: 'csu'
    Owner: 'Quberatron'
    DataClassification: 'general'
  }
  properties: {
    sku: {
      tier: 'Basic'
    }
    threatIntelMode: 'Alert'
    snat: {}
  }
}

resource ipGroups_ipg_btccentralhub_dev_uksouth_001_name_resource 'Microsoft.Network/ipGroups@2023-09-01' = {
  name: ipGroups_ipg_btccentralhub_dev_uksouth_001_name
  location: 'uksouth'
  tags: {
    Environment: 'dev'
    WorkloadName: 'BTCCentralHub'
    BusinessCriticality: 'medium'
    CostCentre: 'csu'
    Owner: 'Quberatron'
    DataClassification: 'general'
  }
  properties: {
    ipAddresses: [
      '10.140.0.0/24'
      '10.140.1.0/24'
      '10.140.2.0/24'
      '10.140.3.0/24'
      '10.140.4.0/24'
      '10.140.5.0/24'
      '10.140.6.0/24'
      '10.140.7.0/24'
      '10.140.8.0/24'
      '10.140.9.0/24'
      '10.140.10.0/24'
      '10.140.11.0/24'
      '10.140.12.0/24'
      '10.200.150.0'
      '10.200.150.0/24'
    ]
  }
}

resource publicIPAddresses_pip_btccentralhub_dev_uksouth_001_name_resource 'Microsoft.Network/publicIPAddresses@2023-09-01' = {
  name: publicIPAddresses_pip_btccentralhub_dev_uksouth_001_name
  location: 'uksouth'
  tags: {
    Environment: 'dev'
    WorkloadName: 'BTCCentralHub'
    BusinessCriticality: 'medium'
    CostCentre: 'csu'
    Owner: 'Quberatron'
    DataClassification: 'general'
  }
  sku: {
    name: 'Standard'
    tier: 'Regional'
  }
  properties: {
    ipAddress: '172.167.20.116'
    publicIPAddressVersion: 'IPv4'
    publicIPAllocationMethod: 'Static'
    idleTimeoutInMinutes: 4
    ipTags: []
    ddosSettings: {
      protectionMode: 'VirtualNetworkInherited'
    }
  }
}

resource publicIPAddresses_pip_btccentralhub_fw_dev_uksouth_001_name_resource 'Microsoft.Network/publicIPAddresses@2023-09-01' = {
  name: publicIPAddresses_pip_btccentralhub_fw_dev_uksouth_001_name
  location: 'uksouth'
  tags: {
    Environment: 'dev'
    WorkloadName: 'BTCCentralHub'
    BusinessCriticality: 'medium'
    CostCentre: 'csu'
    Owner: 'Quberatron'
    DataClassification: 'general'
  }
  sku: {
    name: 'Standard'
    tier: 'Regional'
  }
  zones: [
    '1'
    '2'
    '3'
  ]
  properties: {
    ipAddress: '4.158.71.9'
    publicIPAddressVersion: 'IPv4'
    publicIPAllocationMethod: 'Static'
    idleTimeoutInMinutes: 4
    ipTags: []
    ddosSettings: {
      protectionMode: 'VirtualNetworkInherited'
    }
  }
}

resource publicIPAddresses_pip_btccentralhub_fwman_dev_uksouth_001_name_resource 'Microsoft.Network/publicIPAddresses@2023-09-01' = {
  name: publicIPAddresses_pip_btccentralhub_fwman_dev_uksouth_001_name
  location: 'uksouth'
  tags: {
    Environment: 'dev'
    WorkloadName: 'BTCCentralHub'
    BusinessCriticality: 'medium'
    CostCentre: 'csu'
    Owner: 'Quberatron'
    DataClassification: 'general'
  }
  sku: {
    name: 'Standard'
    tier: 'Regional'
  }
  zones: [
    '1'
    '2'
    '3'
  ]
  properties: {
    ipAddress: '4.158.71.26'
    publicIPAddressVersion: 'IPv4'
    publicIPAllocationMethod: 'Static'
    idleTimeoutInMinutes: 4
    ipTags: []
    ddosSettings: {
      protectionMode: 'VirtualNetworkInherited'
    }
  }
}

resource virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_resource 'Microsoft.Network/virtualNetworks@2023-09-01' = {
  name: virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name
  location: 'uksouth'
  tags: {
    Environment: 'dev'
    WorkloadName: 'BTCCentralHub'
    BusinessCriticality: 'medium'
    CostCentre: 'csu'
    Owner: 'Quberatron'
    DataClassification: 'general'
  }
  properties: {
    addressSpace: {
      addressPrefixes: [
        '10.200.150.0/24'
      ]
    }
    dhcpOptions: {
      dnsServers: [
        '10.99.1.4'
        '10.99.1.5'
      ]
    }
    subnets: [
      {
        name: 'AzureFirewallSubnet'
        id: virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_AzureFirewallSubnet.id
        properties: {
          addressPrefix: '10.200.150.0/26'
          serviceEndpoints: []
          delegations: []
          privateEndpointNetworkPolicies: 'Disabled'
          privateLinkServiceNetworkPolicies: 'Enabled'
        }
        type: 'Microsoft.Network/virtualNetworks/subnets'
      }
      {
        name: 'AzureBastionSubnet'
        id: virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_AzureBastionSubnet.id
        properties: {
          addressPrefix: '10.200.150.128/26'
          serviceEndpoints: []
          delegations: []
          privateEndpointNetworkPolicies: 'Disabled'
          privateLinkServiceNetworkPolicies: 'Enabled'
        }
        type: 'Microsoft.Network/virtualNetworks/subnets'
      }
      {
        name: 'AzureFirewallManagementSubnet'
        id: virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_AzureFirewallManagementSubnet.id
        properties: {
          addressPrefix: '10.200.150.64/26'
          routeTable: {
            id: routeTables_abaa0838_cc71_439a_b80f_aca5979be2b6_externalid
          }
          serviceEndpoints: []
          delegations: []
          privateEndpointNetworkPolicies: 'Disabled'
          privateLinkServiceNetworkPolicies: 'Enabled'
        }
        type: 'Microsoft.Network/virtualNetworks/subnets'
      }
    ]
    virtualNetworkPeerings: [
      {
        name: '${virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name}-vnet-entrads'
        id: virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_vnet_entrads.id
        properties: {
          peeringState: 'Connected'
          peeringSyncLevel: 'FullyInSync'
          remoteVirtualNetwork: {
            id: virtualNetworks_vnet_entrads_externalid
          }
          allowVirtualNetworkAccess: true
          allowForwardedTraffic: true
          allowGatewayTransit: true
          useRemoteGateways: false
          doNotVerifyRemoteGateways: false
          remoteAddressSpace: {
            addressPrefixes: [
              '10.99.1.0/24'
            ]
          }
          remoteVirtualNetworkAddressSpace: {
            addressPrefixes: [
              '10.99.1.0/24'
            ]
          }
        }
        type: 'Microsoft.Network/virtualNetworks/virtualNetworkPeerings'
      }
      {
        name: '${virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name}-vnet-avd-uksouth-dev-btc'
        id: virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_vnet_avd_uksouth_dev_btc.id
        properties: {
          peeringState: 'Connected'
          peeringSyncLevel: 'FullyInSync'
          remoteVirtualNetwork: {
            id: virtualNetworks_vnet_avd_uksouth_dev_btc_externalid
          }
          allowVirtualNetworkAccess: true
          allowForwardedTraffic: true
          allowGatewayTransit: false
          useRemoteGateways: false
          doNotVerifyRemoteGateways: false
          remoteAddressSpace: {
            addressPrefixes: [
              '10.140.0.0/24'
            ]
          }
          remoteVirtualNetworkAddressSpace: {
            addressPrefixes: [
              '10.140.0.0/24'
            ]
          }
        }
        type: 'Microsoft.Network/virtualNetworks/virtualNetworkPeerings'
      }
      {
        name: '${virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name}-vnet-mike-infra-uksouth-dev'
        id: virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_vnet_mike_infra_uksouth_dev.id
        properties: {
          peeringState: 'Disconnected'
          peeringSyncLevel: 'FullyInSync'
          remoteVirtualNetwork: {
            id: virtualNetworks_vnet_mike_infra_uksouth_dev_externalid
          }
          allowVirtualNetworkAccess: true
          allowForwardedTraffic: true
          allowGatewayTransit: false
          useRemoteGateways: false
          doNotVerifyRemoteGateways: false
          remoteAddressSpace: {
            addressPrefixes: [
              '10.140.2.0/24'
            ]
          }
          remoteVirtualNetworkAddressSpace: {
            addressPrefixes: [
              '10.140.2.0/24'
            ]
          }
        }
        type: 'Microsoft.Network/virtualNetworks/virtualNetworkPeerings'
      }
    ]
    enableDdosProtection: false
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource 'Microsoft.OperationalInsights/workspaces@2021-12-01-preview' = {
  name: workspaces_law_BTCCentralHub_dev_uksouth_001_name
  location: 'uksouth'
  tags: {
    Environment: 'dev'
    WorkloadName: 'BTCCentralHub'
    BusinessCriticality: 'medium'
    CostCentre: 'csu'
    Owner: 'Quberatron'
    DataClassification: 'general'
  }
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 365
    features: {
      enableLogAccessUsingOnlyResourcePermissions: false
    }
    workspaceCapping: {
      dailyQuotaGb: -1
    }
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
    forceCmkForQuery: true
  }
}

resource storageAccounts_stbtccentralhubdev001_name_resource 'Microsoft.Storage/storageAccounts@2023-04-01' = {
  name: storageAccounts_stbtccentralhubdev001_name
  location: 'uksouth'
  tags: {
    Environment: 'dev'
    WorkloadName: 'BTCCentralHub'
    BusinessCriticality: 'medium'
    CostCentre: 'csu'
    Owner: 'Quberatron'
    DataClassification: 'general'
  }
  sku: {
    name: 'Standard_LRS'
    tier: 'Standard'
  }
  kind: 'StorageV2'
  properties: {
    defaultToOAuthAuthentication: false
    allowCrossTenantReplication: true
    isLocalUserEnabled: false
    isSftpEnabled: false
    azureFilesIdentityBasedAuthentication: {
      directoryServiceOptions: 'AADDS'
      activeDirectoryProperties: {
        domainName: 'quberatron.com'
        domainGuid: storageAccounts_stbtccentralhubdev001_domainGuid
      }
    }
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
    allowSharedKeyAccess: true
    largeFileSharesState: 'Disabled'
    networkAcls: {
      bypass: 'AzureServices'
      virtualNetworkRules: []
      ipRules: []
      defaultAction: 'Allow'
    }
    supportsHttpsTrafficOnly: true
    encryption: {
      requireInfrastructureEncryption: true
      services: {
        file: {
          keyType: 'Account'
          enabled: true
        }
        blob: {
          keyType: 'Account'
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
    accessTier: 'Hot'
  }
}

resource systemTopics_stbtccentralhubdev001_1fea29dc_09db_430c_a52d_e8d388aa4d8b_name_resource 'Microsoft.EventGrid/systemTopics@2023-12-15-preview' = {
  name: systemTopics_stbtccentralhubdev001_1fea29dc_09db_430c_a52d_e8d388aa4d8b_name
  location: 'uksouth'
  properties: {
    source: storageAccounts_stbtccentralhubdev001_name_resource.id
    topicType: 'microsoft.storage.storageaccounts'
  }
}

resource systemTopics_stbtccentralhubdev001_1fea29dc_09db_430c_a52d_e8d388aa4d8b_name_StorageAntimalwareSubscription 'Microsoft.EventGrid/systemTopics/eventSubscriptions@2023-12-15-preview' = {
  parent: systemTopics_stbtccentralhubdev001_1fea29dc_09db_430c_a52d_e8d388aa4d8b_name_resource
  name: 'StorageAntimalwareSubscription'
  properties: {
    destination: {
      properties: {
        maxEventsPerBatch: 1
        preferredBatchSizeInKilobytes: 64
        azureActiveDirectoryTenantId: '33e01921-4d64-4f8c-a055-5bdaffd5e33d'
        azureActiveDirectoryApplicationIdOrUri: 'f1f8da5f-609a-401d-85b2-d498116b7265'
      }
      endpointType: 'WebHook'
    }
    filter: {
      includedEventTypes: [
        'Microsoft.Storage.BlobCreated'
      ]
      advancedFilters: [
        {
          values: [
            'BlockBlob'
          ]
          operatorType: 'StringContains'
          key: 'data.blobType'
        }
      ]
    }
    eventDeliverySchema: 'EventGridSchema'
    retryPolicy: {
      maxDeliveryAttempts: 30
      eventTimeToLiveInMinutes: 1440
    }
  }
}

resource vaults_kv_btccentralhub_dev_name_LocalAdminPassword 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  parent: vaults_kv_btccentralhub_dev_name_resource
  name: 'LocalAdminPassword'
  location: 'uksouth'
  properties: {
    contentType: 'password'
    attributes: {
      enabled: true
    }
  }
}

resource vaults_kv_btccentralhub_dev_name_VMJoinerPassword 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  parent: vaults_kv_btccentralhub_dev_name_resource
  name: 'VMJoinerPassword'
  location: 'uksouth'
  properties: {
    contentType: 'password'
    attributes: {
      enabled: true
    }
  }
}

resource virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_AzureBastionSubnet 'Microsoft.Network/virtualNetworks/subnets@2023-09-01' = {
  name: '${virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name}/AzureBastionSubnet'
  properties: {
    addressPrefix: '10.200.150.128/26'
    serviceEndpoints: []
    delegations: []
    privateEndpointNetworkPolicies: 'Disabled'
    privateLinkServiceNetworkPolicies: 'Enabled'
  }
  dependsOn: [
    virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_resource
  ]
}

resource virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_AzureFirewallManagementSubnet 'Microsoft.Network/virtualNetworks/subnets@2023-09-01' = {
  name: '${virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name}/AzureFirewallManagementSubnet'
  properties: {
    addressPrefix: '10.200.150.64/26'
    routeTable: {
      id: routeTables_abaa0838_cc71_439a_b80f_aca5979be2b6_externalid
    }
    serviceEndpoints: []
    delegations: []
    privateEndpointNetworkPolicies: 'Disabled'
    privateLinkServiceNetworkPolicies: 'Enabled'
  }
  dependsOn: [
    virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_resource
  ]
}

resource virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_AzureFirewallSubnet 'Microsoft.Network/virtualNetworks/subnets@2023-09-01' = {
  name: '${virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name}/AzureFirewallSubnet'
  properties: {
    addressPrefix: '10.200.150.0/26'
    serviceEndpoints: []
    delegations: []
    privateEndpointNetworkPolicies: 'Disabled'
    privateLinkServiceNetworkPolicies: 'Enabled'
  }
  dependsOn: [
    virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_resource
  ]
}

resource virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_vnet_avd_uksouth_dev_btc 'Microsoft.Network/virtualNetworks/virtualNetworkPeerings@2023-09-01' = {
  name: '${virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name}/${virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name}-vnet-avd-uksouth-dev-btc'
  properties: {
    peeringState: 'Connected'
    peeringSyncLevel: 'FullyInSync'
    remoteVirtualNetwork: {
      id: virtualNetworks_vnet_avd_uksouth_dev_btc_externalid
    }
    allowVirtualNetworkAccess: true
    allowForwardedTraffic: true
    allowGatewayTransit: false
    useRemoteGateways: false
    doNotVerifyRemoteGateways: false
    remoteAddressSpace: {
      addressPrefixes: [
        '10.140.0.0/24'
      ]
    }
    remoteVirtualNetworkAddressSpace: {
      addressPrefixes: [
        '10.140.0.0/24'
      ]
    }
  }
  dependsOn: [
    virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_resource
  ]
}

resource virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_vnet_entrads 'Microsoft.Network/virtualNetworks/virtualNetworkPeerings@2023-09-01' = {
  name: '${virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name}/${virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name}-vnet-entrads'
  properties: {
    peeringState: 'Connected'
    peeringSyncLevel: 'FullyInSync'
    remoteVirtualNetwork: {
      id: virtualNetworks_vnet_entrads_externalid
    }
    allowVirtualNetworkAccess: true
    allowForwardedTraffic: true
    allowGatewayTransit: true
    useRemoteGateways: false
    doNotVerifyRemoteGateways: false
    remoteAddressSpace: {
      addressPrefixes: [
        '10.99.1.0/24'
      ]
    }
    remoteVirtualNetworkAddressSpace: {
      addressPrefixes: [
        '10.99.1.0/24'
      ]
    }
  }
  dependsOn: [
    virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_resource
  ]
}

resource virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_vnet_mike_infra_uksouth_dev 'Microsoft.Network/virtualNetworks/virtualNetworkPeerings@2023-09-01' = {
  name: '${virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name}/${virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name}-vnet-mike-infra-uksouth-dev'
  properties: {
    peeringState: 'Disconnected'
    peeringSyncLevel: 'FullyInSync'
    remoteVirtualNetwork: {
      id: virtualNetworks_vnet_mike_infra_uksouth_dev_externalid
    }
    allowVirtualNetworkAccess: true
    allowForwardedTraffic: true
    allowGatewayTransit: false
    useRemoteGateways: false
    doNotVerifyRemoteGateways: false
    remoteAddressSpace: {
      addressPrefixes: [
        '10.140.2.0/24'
      ]
    }
    remoteVirtualNetworkAddressSpace: {
      addressPrefixes: [
        '10.140.2.0/24'
      ]
    }
  }
  dependsOn: [
    virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_resource
  ]
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_General_AlphabeticallySortedComputers 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_General|AlphabeticallySortedComputers'
  properties: {
    category: 'General Exploration'
    displayName: 'All Computers with their most recent data'
    version: 2
    query: 'search not(ObjectName == "Advisor Metrics" or ObjectName == "ManagedSpace") | summarize AggregatedValue = max(TimeGenerated) by Computer | limit 500000 | sort by Computer asc\r\n// Oql: NOT(ObjectName="Advisor Metrics" OR ObjectName=ManagedSpace) | measure max(TimeGenerated) by Computer | top 500000 | Sort Computer // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_General_dataPointsPerManagementGroup 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_General|dataPointsPerManagementGroup'
  properties: {
    category: 'General Exploration'
    displayName: 'Which Management Group is generating the most data points?'
    version: 2
    query: 'search * | summarize AggregatedValue = count() by ManagementGroupName\r\n// Oql: * | Measure count() by ManagementGroupName // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_General_dataTypeDistribution 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_General|dataTypeDistribution'
  properties: {
    category: 'General Exploration'
    displayName: 'Distribution of data Types'
    version: 2
    query: 'search * | extend Type = $table | summarize AggregatedValue = count() by Type\r\n// Oql: * | Measure count() by Type // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_General_StaleComputers 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_General|StaleComputers'
  properties: {
    category: 'General Exploration'
    displayName: 'Stale Computers (data older than 24 hours)'
    version: 2
    query: 'search not(ObjectName == "Advisor Metrics" or ObjectName == "ManagedSpace") | summarize lastdata = max(TimeGenerated) by Computer | limit 500000 | where lastdata < ago(24h)\r\n// Oql: NOT(ObjectName="Advisor Metrics" OR ObjectName=ManagedSpace) | measure max(TimeGenerated) as lastdata by Computer | top 500000 | where lastdata < NOW-24HOURS // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_AllEvents 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|AllEvents'
  properties: {
    category: 'Log Management'
    displayName: 'All Events'
    version: 2
    query: 'Event | sort by TimeGenerated desc\r\n// Oql: Type=Event // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_AllSyslog 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|AllSyslog'
  properties: {
    category: 'Log Management'
    displayName: 'All Syslogs'
    version: 2
    query: 'Syslog | sort by TimeGenerated desc\r\n// Oql: Type=Syslog // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_AllSyslogByFacility 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|AllSyslogByFacility'
  properties: {
    category: 'Log Management'
    displayName: 'All Syslog Records grouped by Facility'
    version: 2
    query: 'Syslog | summarize AggregatedValue = count() by Facility\r\n// Oql: Type=Syslog | Measure count() by Facility // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_AllSyslogByProcess 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|AllSyslogByProcessName'
  properties: {
    category: 'Log Management'
    displayName: 'All Syslog Records grouped by ProcessName'
    version: 2
    query: 'Syslog | summarize AggregatedValue = count() by ProcessName\r\n// Oql: Type=Syslog | Measure count() by ProcessName // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_AllSyslogsWithErrors 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|AllSyslogsWithErrors'
  properties: {
    category: 'Log Management'
    displayName: 'All Syslog Records with Errors'
    version: 2
    query: 'Syslog | where SeverityLevel == "error" | sort by TimeGenerated desc\r\n// Oql: Type=Syslog SeverityLevel=error // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_AverageHTTPRequestTimeByClientIPAddress 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|AverageHTTPRequestTimeByClientIPAddress'
  properties: {
    category: 'Log Management'
    displayName: 'Average HTTP Request time by Client IP Address'
    version: 2
    query: 'search * | extend Type = $table | where Type == W3CIISLog | summarize AggregatedValue = avg(TimeTaken) by cIP\r\n// Oql: Type=W3CIISLog | Measure Avg(TimeTaken) by cIP // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_AverageHTTPRequestTimeHTTPMethod 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|AverageHTTPRequestTimeHTTPMethod'
  properties: {
    category: 'Log Management'
    displayName: 'Average HTTP Request time by HTTP Method'
    version: 2
    query: 'search * | extend Type = $table | where Type == W3CIISLog | summarize AggregatedValue = avg(TimeTaken) by csMethod\r\n// Oql: Type=W3CIISLog | Measure Avg(TimeTaken) by csMethod // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_CountIISLogEntriesClientIPAddress 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|CountIISLogEntriesClientIPAddress'
  properties: {
    category: 'Log Management'
    displayName: 'Count of IIS Log Entries by Client IP Address'
    version: 2
    query: 'search * | extend Type = $table | where Type == W3CIISLog | summarize AggregatedValue = count() by cIP\r\n// Oql: Type=W3CIISLog | Measure count() by cIP // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_CountIISLogEntriesHTTPRequestMethod 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|CountIISLogEntriesHTTPRequestMethod'
  properties: {
    category: 'Log Management'
    displayName: 'Count of IIS Log Entries by HTTP Request Method'
    version: 2
    query: 'search * | extend Type = $table | where Type == W3CIISLog | summarize AggregatedValue = count() by csMethod\r\n// Oql: Type=W3CIISLog | Measure count() by csMethod // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_CountIISLogEntriesHTTPUserAgent 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|CountIISLogEntriesHTTPUserAgent'
  properties: {
    category: 'Log Management'
    displayName: 'Count of IIS Log Entries by HTTP User Agent'
    version: 2
    query: 'search * | extend Type = $table | where Type == W3CIISLog | summarize AggregatedValue = count() by csUserAgent\r\n// Oql: Type=W3CIISLog | Measure count() by csUserAgent // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_CountOfIISLogEntriesByHostRequestedByClient 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|CountOfIISLogEntriesByHostRequestedByClient'
  properties: {
    category: 'Log Management'
    displayName: 'Count of IIS Log Entries by Host requested by client'
    version: 2
    query: 'search * | extend Type = $table | where Type == W3CIISLog | summarize AggregatedValue = count() by csHost\r\n// Oql: Type=W3CIISLog | Measure count() by csHost // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_CountOfIISLogEntriesByURLForHost 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|CountOfIISLogEntriesByURLForHost'
  properties: {
    category: 'Log Management'
    displayName: 'Count of IIS Log Entries by URL for the host "www.contoso.com" (replace with your own)'
    version: 2
    query: 'search csHost == "www.contoso.com" | extend Type = $table | where Type == W3CIISLog | summarize AggregatedValue = count() by csUriStem\r\n// Oql: Type=W3CIISLog csHost="www.contoso.com" | Measure count() by csUriStem // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_CountOfIISLogEntriesByURLRequestedByClient 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|CountOfIISLogEntriesByURLRequestedByClient'
  properties: {
    category: 'Log Management'
    displayName: 'Count of IIS Log Entries by URL requested by client (without query strings)'
    version: 2
    query: 'search * | extend Type = $table | where Type == W3CIISLog | summarize AggregatedValue = count() by csUriStem\r\n// Oql: Type=W3CIISLog | Measure count() by csUriStem // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_CountOfWarningEvents 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|CountOfWarningEvents'
  properties: {
    category: 'Log Management'
    displayName: 'Count of Events with level "Warning" grouped by Event ID'
    version: 2
    query: 'Event | where EventLevelName == "warning" | summarize AggregatedValue = count() by EventID\r\n// Oql: Type=Event EventLevelName=warning | Measure count() by EventID // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_DisplayBreakdownRespondCodes 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|DisplayBreakdownRespondCodes'
  properties: {
    category: 'Log Management'
    displayName: 'Shows breakdown of response codes'
    version: 2
    query: 'search * | extend Type = $table | where Type == W3CIISLog | summarize AggregatedValue = count() by scStatus\r\n// Oql: Type=W3CIISLog | Measure count() by scStatus // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_EventsByEventLog 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|EventsByEventLog'
  properties: {
    category: 'Log Management'
    displayName: 'Count of Events grouped by Event Log'
    version: 2
    query: 'Event | summarize AggregatedValue = count() by EventLog\r\n// Oql: Type=Event | Measure count() by EventLog // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_EventsByEventsID 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|EventsByEventsID'
  properties: {
    category: 'Log Management'
    displayName: 'Count of Events grouped by Event ID'
    version: 2
    query: 'Event | summarize AggregatedValue = count() by EventID\r\n// Oql: Type=Event | Measure count() by EventID // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_EventsByEventSource 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|EventsByEventSource'
  properties: {
    category: 'Log Management'
    displayName: 'Count of Events grouped by Event Source'
    version: 2
    query: 'Event | summarize AggregatedValue = count() by Source\r\n// Oql: Type=Event | Measure count() by Source // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_EventsInOMBetween2000to3000 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|EventsInOMBetween2000to3000'
  properties: {
    category: 'Log Management'
    displayName: 'Events in the Operations Manager Event Log whose Event ID is in the range between 2000 and 3000'
    version: 2
    query: 'Event | where EventLog == "Operations Manager" and EventID >= 2000 and EventID <= 3000 | sort by TimeGenerated desc\r\n// Oql: Type=Event EventLog="Operations Manager" EventID:[2000..3000] // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_EventsWithStartedinEventID 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|EventsWithStartedinEventID'
  properties: {
    category: 'Log Management'
    displayName: 'Count of Events containing the word "started" grouped by EventID'
    version: 2
    query: 'search in (Event) "started" | summarize AggregatedValue = count() by EventID\r\n// Oql: Type=Event "started" | Measure count() by EventID // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_FindMaximumTimeTakenForEachPage 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|FindMaximumTimeTakenForEachPage'
  properties: {
    category: 'Log Management'
    displayName: 'Find the maximum time taken for each page'
    version: 2
    query: 'search * | extend Type = $table | where Type == W3CIISLog | summarize AggregatedValue = max(TimeTaken) by csUriStem\r\n// Oql: Type=W3CIISLog | Measure Max(TimeTaken) by csUriStem // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_IISLogEntriesForClientIP 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|IISLogEntriesForClientIP'
  properties: {
    category: 'Log Management'
    displayName: 'IIS Log Entries for a specific client IP Address (replace with your own)'
    version: 2
    query: 'search cIP == "192.168.0.1" | extend Type = $table | where Type == W3CIISLog | sort by TimeGenerated desc | project csUriStem, scBytes, csBytes, TimeTaken, scStatus\r\n// Oql: Type=W3CIISLog cIP="192.168.0.1" | Select csUriStem,scBytes,csBytes,TimeTaken,scStatus // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_ListAllIISLogEntries 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|ListAllIISLogEntries'
  properties: {
    category: 'Log Management'
    displayName: 'All IIS Log Entries'
    version: 2
    query: 'search * | extend Type = $table | where Type == W3CIISLog | sort by TimeGenerated desc\r\n// Oql: Type=W3CIISLog // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_NoOfConnectionsToOMSDKService 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|NoOfConnectionsToOMSDKService'
  properties: {
    category: 'Log Management'
    displayName: 'How many connections to Operations Manager\'s SDK service by day'
    version: 2
    query: 'Event | where EventID == 26328 and EventLog == "Operations Manager" | summarize AggregatedValue = count() by bin(TimeGenerated, 1d) | sort by TimeGenerated desc\r\n// Oql: Type=Event EventID=26328 EventLog="Operations Manager" | Measure count() interval 1DAY // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_ServerRestartTime 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|ServerRestartTime'
  properties: {
    category: 'Log Management'
    displayName: 'When did my servers initiate restart?'
    version: 2
    query: 'search in (Event) "shutdown" and EventLog == "System" and Source == "User32" and EventID == 1074 | sort by TimeGenerated desc | project TimeGenerated, Computer\r\n// Oql: shutdown Type=Event EventLog=System Source=User32 EventID=1074 | Select TimeGenerated,Computer // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_Show404PagesList 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|Show404PagesList'
  properties: {
    category: 'Log Management'
    displayName: 'Shows which pages people are getting a 404 for'
    version: 2
    query: 'search scStatus == 404 | extend Type = $table | where Type == W3CIISLog | summarize AggregatedValue = count() by csUriStem\r\n// Oql: Type=W3CIISLog scStatus=404 | Measure count() by csUriStem // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_ShowServersThrowingInternalServerError 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|ShowServersThrowingInternalServerError'
  properties: {
    category: 'Log Management'
    displayName: 'Shows servers that are throwing internal server error'
    version: 2
    query: 'search scStatus == 500 | extend Type = $table | where Type == W3CIISLog | summarize AggregatedValue = count() by sComputerName\r\n// Oql: Type=W3CIISLog scStatus=500 | Measure count() by sComputerName // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_TotalBytesReceivedByEachAzureRoleInstance 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|TotalBytesReceivedByEachAzureRoleInstance'
  properties: {
    category: 'Log Management'
    displayName: 'Total Bytes received by each Azure Role Instance'
    version: 2
    query: 'search * | extend Type = $table | where Type == W3CIISLog | summarize AggregatedValue = sum(csBytes) by RoleInstance\r\n// Oql: Type=W3CIISLog | Measure Sum(csBytes) by RoleInstance // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_TotalBytesReceivedByEachIISComputer 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|TotalBytesReceivedByEachIISComputer'
  properties: {
    category: 'Log Management'
    displayName: 'Total Bytes received by each IIS Computer'
    version: 2
    query: 'search * | extend Type = $table | where Type == W3CIISLog | summarize AggregatedValue = sum(csBytes) by Computer | limit 500000\r\n// Oql: Type=W3CIISLog | Measure Sum(csBytes) by Computer | top 500000 // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_TotalBytesRespondedToClientsByClientIPAddress 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|TotalBytesRespondedToClientsByClientIPAddress'
  properties: {
    category: 'Log Management'
    displayName: 'Total Bytes responded back to clients by Client IP Address'
    version: 2
    query: 'search * | extend Type = $table | where Type == W3CIISLog | summarize AggregatedValue = sum(scBytes) by cIP\r\n// Oql: Type=W3CIISLog | Measure Sum(scBytes) by cIP // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_TotalBytesRespondedToClientsByEachIISServerIPAddress 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|TotalBytesRespondedToClientsByEachIISServerIPAddress'
  properties: {
    category: 'Log Management'
    displayName: 'Total Bytes responded back to clients by each IIS ServerIP Address'
    version: 2
    query: 'search * | extend Type = $table | where Type == W3CIISLog | summarize AggregatedValue = sum(scBytes) by sIP\r\n// Oql: Type=W3CIISLog | Measure Sum(scBytes) by sIP // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_TotalBytesSentByClientIPAddress 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|TotalBytesSentByClientIPAddress'
  properties: {
    category: 'Log Management'
    displayName: 'Total Bytes sent by Client IP Address'
    version: 2
    query: 'search * | extend Type = $table | where Type == W3CIISLog | summarize AggregatedValue = sum(csBytes) by cIP\r\n// Oql: Type=W3CIISLog | Measure Sum(csBytes) by cIP // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PEF: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_WarningEvents 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|WarningEvents'
  properties: {
    category: 'Log Management'
    displayName: 'All Events with level "Warning"'
    version: 2
    query: 'Event | where EventLevelName == "warning" | sort by TimeGenerated desc\r\n// Oql: Type=Event EventLevelName=warning // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_WindowsFireawallPolicySettingsChanged 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|WindowsFireawallPolicySettingsChanged'
  properties: {
    category: 'Log Management'
    displayName: 'Windows Firewall Policy settings have changed'
    version: 2
    query: 'Event | where EventLog == "Microsoft-Windows-Windows Firewall With Advanced Security/Firewall" and EventID == 2008 | sort by TimeGenerated desc\r\n// Oql: Type=Event EventLog="Microsoft-Windows-Windows Firewall With Advanced Security/Firewall" EventID=2008 // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogManagement_WindowsFireawallPolicySettingsChangedByMachines 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogManagement(${workspaces_law_BTCCentralHub_dev_uksouth_001_name})_LogManagement|WindowsFireawallPolicySettingsChangedByMachines'
  properties: {
    category: 'Log Management'
    displayName: 'On which machines and how many times have Windows Firewall Policy settings changed'
    version: 2
    query: 'Event | where EventLog == "Microsoft-Windows-Windows Firewall With Advanced Security/Firewall" and EventID == 2008 | summarize AggregatedValue = count() by Computer | limit 500000\r\n// Oql: Type=Event EventLog="Microsoft-Windows-Windows Firewall With Advanced Security/Firewall" EventID=2008 | measure count() by Computer | top 500000 // Args: {OQ: True; WorkspaceId: 00000000-0000-0000-0000-000000000000} // Settings: {PTT: True; SortI: True; SortF: True} // Version: 0.1.122'
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AACAudit 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AACAudit'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AACAudit'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AACHttpRequest 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AACHttpRequest'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AACHttpRequest'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADB2CRequestLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADB2CRequestLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADB2CRequestLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADCustomSecurityAttributeAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADCustomSecurityAttributeAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADCustomSecurityAttributeAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADDomainServicesAccountLogon 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADDomainServicesAccountLogon'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADDomainServicesAccountLogon'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADDomainServicesAccountManagement 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADDomainServicesAccountManagement'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADDomainServicesAccountManagement'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADDomainServicesDirectoryServiceAccess 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADDomainServicesDirectoryServiceAccess'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADDomainServicesDirectoryServiceAccess'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADDomainServicesDNSAuditsDynamicUpdates 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADDomainServicesDNSAuditsDynamicUpdates'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADDomainServicesDNSAuditsDynamicUpdates'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADDomainServicesDNSAuditsGeneral 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADDomainServicesDNSAuditsGeneral'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADDomainServicesDNSAuditsGeneral'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADDomainServicesLogonLogoff 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADDomainServicesLogonLogoff'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADDomainServicesLogonLogoff'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADDomainServicesPolicyChange 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADDomainServicesPolicyChange'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADDomainServicesPolicyChange'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADDomainServicesPrivilegeUse 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADDomainServicesPrivilegeUse'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADDomainServicesPrivilegeUse'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADDomainServicesSystemSecurity 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADDomainServicesSystemSecurity'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADDomainServicesSystemSecurity'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADManagedIdentitySignInLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADManagedIdentitySignInLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADManagedIdentitySignInLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADNonInteractiveUserSignInLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADNonInteractiveUserSignInLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADNonInteractiveUserSignInLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADProvisioningLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADProvisioningLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADProvisioningLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADRiskyServicePrincipals 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADRiskyServicePrincipals'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADRiskyServicePrincipals'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADRiskyUsers 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADRiskyUsers'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADRiskyUsers'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADServicePrincipalRiskEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADServicePrincipalRiskEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADServicePrincipalRiskEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADServicePrincipalSignInLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADServicePrincipalSignInLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADServicePrincipalSignInLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AADUserRiskEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AADUserRiskEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AADUserRiskEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ABSBotRequests 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ABSBotRequests'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ABSBotRequests'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ABSChannelToBotRequests 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ABSChannelToBotRequests'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ABSChannelToBotRequests'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ABSDependenciesRequests 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ABSDependenciesRequests'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ABSDependenciesRequests'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACICollaborationAudit 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACICollaborationAudit'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACICollaborationAudit'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACRConnectedClientList 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACRConnectedClientList'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACRConnectedClientList'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSAuthIncomingOperations 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSAuthIncomingOperations'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSAuthIncomingOperations'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSBillingUsage 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSBillingUsage'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSBillingUsage'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSCallAutomationIncomingOperations 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSCallAutomationIncomingOperations'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSCallAutomationIncomingOperations'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSCallAutomationMediaSummary 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSCallAutomationMediaSummary'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSCallAutomationMediaSummary'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSCallClientMediaStatsTimeSeries 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSCallClientMediaStatsTimeSeries'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSCallClientMediaStatsTimeSeries'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSCallClientOperations 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSCallClientOperations'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSCallClientOperations'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSCallClosedCaptionsSummary 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSCallClosedCaptionsSummary'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSCallClosedCaptionsSummary'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSCallDiagnostics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSCallDiagnostics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSCallDiagnostics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSCallRecordingIncomingOperations 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSCallRecordingIncomingOperations'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSCallRecordingIncomingOperations'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSCallRecordingSummary 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSCallRecordingSummary'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSCallRecordingSummary'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSCallSummary 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSCallSummary'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSCallSummary'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSCallSurvey 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSCallSurvey'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSCallSurvey'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSChatIncomingOperations 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSChatIncomingOperations'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSChatIncomingOperations'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSEmailSendMailOperational 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSEmailSendMailOperational'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSEmailSendMailOperational'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSEmailStatusUpdateOperational 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSEmailStatusUpdateOperational'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSEmailStatusUpdateOperational'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSEmailUserEngagementOperational 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSEmailUserEngagementOperational'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSEmailUserEngagementOperational'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSJobRouterIncomingOperations 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSJobRouterIncomingOperations'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSJobRouterIncomingOperations'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSNetworkTraversalDiagnostics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSNetworkTraversalDiagnostics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSNetworkTraversalDiagnostics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSNetworkTraversalIncomingOperations 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSNetworkTraversalIncomingOperations'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSNetworkTraversalIncomingOperations'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSRoomsIncomingOperations 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSRoomsIncomingOperations'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSRoomsIncomingOperations'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ACSSMSIncomingOperations 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ACSSMSIncomingOperations'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ACSSMSIncomingOperations'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADAssessmentRecommendation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADAssessmentRecommendation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADAssessmentRecommendation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AddonAzureBackupAlerts 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AddonAzureBackupAlerts'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AddonAzureBackupAlerts'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AddonAzureBackupJobs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AddonAzureBackupJobs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AddonAzureBackupJobs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AddonAzureBackupPolicy 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AddonAzureBackupPolicy'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AddonAzureBackupPolicy'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AddonAzureBackupProtectedInstance 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AddonAzureBackupProtectedInstance'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AddonAzureBackupProtectedInstance'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AddonAzureBackupStorage 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AddonAzureBackupStorage'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AddonAzureBackupStorage'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADFActivityRun 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADFActivityRun'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADFActivityRun'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADFAirflowSchedulerLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADFAirflowSchedulerLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADFAirflowSchedulerLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADFAirflowTaskLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADFAirflowTaskLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADFAirflowTaskLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADFAirflowWebLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADFAirflowWebLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADFAirflowWebLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADFAirflowWorkerLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADFAirflowWorkerLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADFAirflowWorkerLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADFPipelineRun 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADFPipelineRun'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADFPipelineRun'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADFSandboxActivityRun 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADFSandboxActivityRun'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADFSandboxActivityRun'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADFSandboxPipelineRun 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADFSandboxPipelineRun'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADFSandboxPipelineRun'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADFSSignInLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADFSSignInLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADFSSignInLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADFSSISIntegrationRuntimeLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADFSSISIntegrationRuntimeLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADFSSISIntegrationRuntimeLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADFSSISPackageEventMessageContext 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADFSSISPackageEventMessageContext'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADFSSISPackageEventMessageContext'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADFSSISPackageEventMessages 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADFSSISPackageEventMessages'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADFSSISPackageEventMessages'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADFSSISPackageExecutableStatistics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADFSSISPackageExecutableStatistics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADFSSISPackageExecutableStatistics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADFSSISPackageExecutionComponentPhases 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADFSSISPackageExecutionComponentPhases'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADFSSISPackageExecutionComponentPhases'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADFSSISPackageExecutionDataStatistics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADFSSISPackageExecutionDataStatistics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADFSSISPackageExecutionDataStatistics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADFTriggerRun 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADFTriggerRun'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADFTriggerRun'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADPAudit 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADPAudit'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADPAudit'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADPDiagnostics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADPDiagnostics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADPDiagnostics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADPRequests 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADPRequests'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADPRequests'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADReplicationResult 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADReplicationResult'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADReplicationResult'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADSecurityAssessmentRecommendation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADSecurityAssessmentRecommendation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADSecurityAssessmentRecommendation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADTDataHistoryOperation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADTDataHistoryOperation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADTDataHistoryOperation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADTDigitalTwinsOperation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADTDigitalTwinsOperation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADTDigitalTwinsOperation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADTEventRoutesOperation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADTEventRoutesOperation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADTEventRoutesOperation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADTModelsOperation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADTModelsOperation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADTModelsOperation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADTQueryOperation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADTQueryOperation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADTQueryOperation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADXCommand 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADXCommand'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADXCommand'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADXIngestionBatching 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADXIngestionBatching'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADXIngestionBatching'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADXJournal 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADXJournal'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADXJournal'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADXQuery 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADXQuery'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADXQuery'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADXTableDetails 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADXTableDetails'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADXTableDetails'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ADXTableUsageStatistics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ADXTableUsageStatistics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ADXTableUsageStatistics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AegDataPlaneRequests 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AegDataPlaneRequests'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AegDataPlaneRequests'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AegDeliveryFailureLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AegDeliveryFailureLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AegDeliveryFailureLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AegPublishFailureLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AegPublishFailureLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AegPublishFailureLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AEWAssignmentBlobLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AEWAssignmentBlobLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AEWAssignmentBlobLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AEWAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AEWAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AEWAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AEWComputePipelinesLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AEWComputePipelinesLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AEWComputePipelinesLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AFSAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AFSAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AFSAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AGCAccessLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AGCAccessLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AGCAccessLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AgriFoodApplicationAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AgriFoodApplicationAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AgriFoodApplicationAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AgriFoodFarmManagementLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AgriFoodFarmManagementLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AgriFoodFarmManagementLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AgriFoodFarmOperationLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AgriFoodFarmOperationLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AgriFoodFarmOperationLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AgriFoodInsightLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AgriFoodInsightLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AgriFoodInsightLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AgriFoodJobProcessedLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AgriFoodJobProcessedLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AgriFoodJobProcessedLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AgriFoodModelInferenceLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AgriFoodModelInferenceLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AgriFoodModelInferenceLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AgriFoodProviderAuthLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AgriFoodProviderAuthLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AgriFoodProviderAuthLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AgriFoodSatelliteLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AgriFoodSatelliteLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AgriFoodSatelliteLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AgriFoodSensorManagementLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AgriFoodSensorManagementLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AgriFoodSensorManagementLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AgriFoodWeatherLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AgriFoodWeatherLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AgriFoodWeatherLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AGSGrafanaLoginEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AGSGrafanaLoginEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AGSGrafanaLoginEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AGWAccessLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AGWAccessLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AGWAccessLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AGWFirewallLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AGWFirewallLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AGWFirewallLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AGWPerformanceLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AGWPerformanceLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AGWPerformanceLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AHDSDicomAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AHDSDicomAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AHDSDicomAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AHDSDicomDiagnosticLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AHDSDicomDiagnosticLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AHDSDicomDiagnosticLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AHDSMedTechDiagnosticLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AHDSMedTechDiagnosticLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AHDSMedTechDiagnosticLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AirflowDagProcessingLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AirflowDagProcessingLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AirflowDagProcessingLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AKSAudit 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AKSAudit'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AKSAudit'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AKSAuditAdmin 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AKSAuditAdmin'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AKSAuditAdmin'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AKSControlPlane 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AKSControlPlane'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AKSControlPlane'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ALBHealthEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ALBHealthEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ALBHealthEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_Alert 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'Alert'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'Alert'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlComputeClusterEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlComputeClusterEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlComputeClusterEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlComputeClusterNodeEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlComputeClusterNodeEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlComputeClusterNodeEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlComputeCpuGpuUtilization 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlComputeCpuGpuUtilization'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlComputeCpuGpuUtilization'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlComputeInstanceEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlComputeInstanceEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlComputeInstanceEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlComputeJobEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlComputeJobEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlComputeJobEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlDataLabelEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlDataLabelEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlDataLabelEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlDataSetEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlDataSetEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlDataSetEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlDataStoreEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlDataStoreEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlDataStoreEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlDeploymentEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlDeploymentEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlDeploymentEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlEnvironmentEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlEnvironmentEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlEnvironmentEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlInferencingEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlInferencingEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlInferencingEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlModelsEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlModelsEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlModelsEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlOnlineEndpointConsoleLog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlOnlineEndpointConsoleLog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlOnlineEndpointConsoleLog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlOnlineEndpointEventLog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlOnlineEndpointEventLog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlOnlineEndpointEventLog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlOnlineEndpointTrafficLog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlOnlineEndpointTrafficLog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlOnlineEndpointTrafficLog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlPipelineEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlPipelineEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlPipelineEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlRegistryReadEventsLog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlRegistryReadEventsLog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlRegistryReadEventsLog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlRegistryWriteEventsLog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlRegistryWriteEventsLog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlRegistryWriteEventsLog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlRunEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlRunEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlRunEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AmlRunStatusChangedEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AmlRunStatusChangedEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AmlRunStatusChangedEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AMSKeyDeliveryRequests 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AMSKeyDeliveryRequests'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AMSKeyDeliveryRequests'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AMSLiveEventOperations 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AMSLiveEventOperations'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AMSLiveEventOperations'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AMSMediaAccountHealth 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AMSMediaAccountHealth'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AMSMediaAccountHealth'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AMSStreamingEndpointRequests 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AMSStreamingEndpointRequests'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AMSStreamingEndpointRequests'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AMWMetricsUsageDetails 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AMWMetricsUsageDetails'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AMWMetricsUsageDetails'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ANFFileAccess 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ANFFileAccess'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ANFFileAccess'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AOIDatabaseQuery 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AOIDatabaseQuery'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AOIDatabaseQuery'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AOIDigestion 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AOIDigestion'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AOIDigestion'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AOIStorage 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AOIStorage'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AOIStorage'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ApiManagementGatewayLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ApiManagementGatewayLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ApiManagementGatewayLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ApiManagementWebSocketConnectionLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ApiManagementWebSocketConnectionLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ApiManagementWebSocketConnectionLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppAvailabilityResults 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppAvailabilityResults'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppAvailabilityResults'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppBrowserTimings 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppBrowserTimings'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppBrowserTimings'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppCenterError 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppCenterError'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppCenterError'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppDependencies 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppDependencies'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppDependencies'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppEnvSpringAppConsoleLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppEnvSpringAppConsoleLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppEnvSpringAppConsoleLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppExceptions 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppExceptions'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppExceptions'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppMetrics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppMetrics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppMetrics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppPageViews 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppPageViews'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppPageViews'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppPerformanceCounters 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppPerformanceCounters'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppPerformanceCounters'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppPlatformBuildLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppPlatformBuildLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppPlatformBuildLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppPlatformContainerEventLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppPlatformContainerEventLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppPlatformContainerEventLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppPlatformIngressLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppPlatformIngressLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppPlatformIngressLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppPlatformLogsforSpring 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppPlatformLogsforSpring'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppPlatformLogsforSpring'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppPlatformSystemLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppPlatformSystemLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppPlatformSystemLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppRequests 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppRequests'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppRequests'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppServiceAntivirusScanAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppServiceAntivirusScanAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppServiceAntivirusScanAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppServiceAppLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppServiceAppLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppServiceAppLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppServiceAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppServiceAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppServiceAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppServiceAuthenticationLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppServiceAuthenticationLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppServiceAuthenticationLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppServiceConsoleLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppServiceConsoleLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppServiceConsoleLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppServiceEnvironmentPlatformLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppServiceEnvironmentPlatformLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppServiceEnvironmentPlatformLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppServiceFileAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppServiceFileAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppServiceFileAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppServiceHTTPLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppServiceHTTPLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppServiceHTTPLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppServiceIPSecAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppServiceIPSecAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppServiceIPSecAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppServicePlatformLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppServicePlatformLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppServicePlatformLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppServiceServerlessSecurityPluginData 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppServiceServerlessSecurityPluginData'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppServiceServerlessSecurityPluginData'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppSystemEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppSystemEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppSystemEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AppTraces 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AppTraces'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AppTraces'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ArcK8sAudit 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ArcK8sAudit'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ArcK8sAudit'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ArcK8sAuditAdmin 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ArcK8sAuditAdmin'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ArcK8sAuditAdmin'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ArcK8sControlPlane 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ArcK8sControlPlane'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ArcK8sControlPlane'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ASCAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ASCAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ASCAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ASCDeviceEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ASCDeviceEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ASCDeviceEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ASRJobs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ASRJobs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ASRJobs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ASRReplicatedItems 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ASRReplicatedItems'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ASRReplicatedItems'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ATCExpressRouteCircuitIpfix 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ATCExpressRouteCircuitIpfix'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ATCExpressRouteCircuitIpfix'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AUIEventsAudit 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AUIEventsAudit'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AUIEventsAudit'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AUIEventsOperational 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AUIEventsOperational'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AUIEventsOperational'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AutoscaleEvaluationsLog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AutoscaleEvaluationsLog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AutoscaleEvaluationsLog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AutoscaleScaleActionsLog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AutoscaleScaleActionsLog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AutoscaleScaleActionsLog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AVNMConnectivityConfigurationChange 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AVNMConnectivityConfigurationChange'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AVNMConnectivityConfigurationChange'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AVNMIPAMPoolAllocationChange 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AVNMIPAMPoolAllocationChange'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AVNMIPAMPoolAllocationChange'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AVNMNetworkGroupMembershipChange 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AVNMNetworkGroupMembershipChange'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AVNMNetworkGroupMembershipChange'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AVNMRuleCollectionChange 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AVNMRuleCollectionChange'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AVNMRuleCollectionChange'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AVSSyslog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AVSSyslog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AVSSyslog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZFWApplicationRule 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZFWApplicationRule'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZFWApplicationRule'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZFWApplicationRuleAggregation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZFWApplicationRuleAggregation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZFWApplicationRuleAggregation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZFWDnsQuery 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZFWDnsQuery'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZFWDnsQuery'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZFWFatFlow 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZFWFatFlow'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZFWFatFlow'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZFWFlowTrace 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZFWFlowTrace'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZFWFlowTrace'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZFWIdpsSignature 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZFWIdpsSignature'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZFWIdpsSignature'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZFWInternalFqdnResolutionFailure 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZFWInternalFqdnResolutionFailure'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZFWInternalFqdnResolutionFailure'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZFWNatRule 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZFWNatRule'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZFWNatRule'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZFWNatRuleAggregation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZFWNatRuleAggregation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZFWNatRuleAggregation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZFWNetworkRule 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZFWNetworkRule'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZFWNetworkRule'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZFWNetworkRuleAggregation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZFWNetworkRuleAggregation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZFWNetworkRuleAggregation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZFWThreatIntel 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZFWThreatIntel'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZFWThreatIntel'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZKVAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZKVAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZKVAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZKVPolicyEvaluationDetailsLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZKVPolicyEvaluationDetailsLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZKVPolicyEvaluationDetailsLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZMSApplicationMetricLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZMSApplicationMetricLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZMSApplicationMetricLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZMSArchiveLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZMSArchiveLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZMSArchiveLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZMSAutoscaleLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZMSAutoscaleLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZMSAutoscaleLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZMSCustomerManagedKeyUserLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZMSCustomerManagedKeyUserLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZMSCustomerManagedKeyUserLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZMSDiagnosticErrorLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZMSDiagnosticErrorLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZMSDiagnosticErrorLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZMSHybridConnectionsEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZMSHybridConnectionsEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZMSHybridConnectionsEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZMSKafkaCoordinatorLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZMSKafkaCoordinatorLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZMSKafkaCoordinatorLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZMSKafkaUserErrorLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZMSKafkaUserErrorLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZMSKafkaUserErrorLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZMSOperationalLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZMSOperationalLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZMSOperationalLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZMSRunTimeAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZMSRunTimeAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZMSRunTimeAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AZMSVnetConnectionEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AZMSVnetConnectionEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AZMSVnetConnectionEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AzureActivity 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AzureActivity'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AzureActivity'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AzureActivityV2 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AzureActivityV2'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AzureActivityV2'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AzureAssessmentRecommendation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AzureAssessmentRecommendation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AzureAssessmentRecommendation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AzureAttestationDiagnostics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AzureAttestationDiagnostics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AzureAttestationDiagnostics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AzureBackupOperations 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AzureBackupOperations'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AzureBackupOperations'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AzureCloudHsmAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AzureCloudHsmAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AzureCloudHsmAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AzureDevOpsAuditing 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AzureDevOpsAuditing'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AzureDevOpsAuditing'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AzureDiagnostics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AzureDiagnostics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AzureDiagnostics'
      columns: [
        {
          name: 'QueryId_d'
          type: 'real'
          displayName: 'QueryId_d'
        }
        {
          name: 'QueryType_s'
          type: 'string'
          displayName: 'QueryType_s'
        }
        {
          name: 'QueryClass_s'
          type: 'string'
          displayName: 'QueryClass_s'
        }
        {
          name: 'QueryName_s'
          type: 'string'
          displayName: 'QueryName_s'
        }
        {
          name: 'RequestSize_d'
          type: 'real'
          displayName: 'RequestSize_d'
        }
        {
          name: 'DnssecOkBit_b'
          type: 'boolean'
          displayName: 'DnssecOkBit_b'
        }
        {
          name: 'EDNS0BufferSize_d'
          type: 'real'
          displayName: 'EDNS0BufferSize_d'
        }
        {
          name: 'ResponseCode_s'
          type: 'string'
          displayName: 'ResponseCode_s'
        }
        {
          name: 'ResponseFlags_s'
          type: 'string'
          displayName: 'ResponseFlags_s'
        }
        {
          name: 'ResponseSize_d'
          type: 'real'
          displayName: 'ResponseSize_d'
        }
        {
          name: 'RequestDurationSecs_d'
          type: 'real'
          displayName: 'RequestDurationSecs_d'
        }
        {
          name: 'ErrorNumber_d'
          type: 'real'
          displayName: 'ErrorNumber_d'
        }
        {
          name: 'ErrorMessage_s'
          type: 'string'
          displayName: 'ErrorMessage_s'
        }
        {
          name: 'Fqdn_s'
          type: 'string'
          displayName: 'Fqdn_s'
        }
        {
          name: 'TargetUrl_s'
          type: 'string'
          displayName: 'TargetUrl_s'
        }
        {
          name: 'IsTlsInspected_b'
          type: 'boolean'
          displayName: 'IsTlsInspected_b'
        }
        {
          name: 'WebCategory_s'
          type: 'string'
          displayName: 'WebCategory_s'
        }
        {
          name: 'IsExplicitProxyRequest_b'
          type: 'boolean'
          displayName: 'IsExplicitProxyRequest_b'
        }
        {
          name: 'OperationName'
          type: 'string'
          displayName: 'OperationName'
        }
        {
          name: 'msg_s'
          type: 'string'
          displayName: 'msg_s'
        }
        {
          name: 'Category'
          type: 'string'
          displayName: 'Category'
        }
        {
          name: 'ResourceId'
          type: 'string'
          displayName: 'ResourceId'
        }
        {
          name: 'Protocol_s'
          type: 'string'
          displayName: 'Protocol_s'
        }
        {
          name: 'SourceIP'
          type: 'string'
          displayName: 'SourceIP'
        }
        {
          name: 'SourcePort_d'
          type: 'real'
          displayName: 'SourcePort_d'
        }
        {
          name: 'DestinationIp_s'
          type: 'string'
          displayName: 'DestinationIp_s'
        }
        {
          name: 'DestinationPort_d'
          type: 'real'
          displayName: 'DestinationPort_d'
        }
        {
          name: 'Action_s'
          type: 'string'
          displayName: 'Action_s'
        }
        {
          name: 'Policy_s'
          type: 'string'
          displayName: 'Policy_s'
        }
        {
          name: 'RuleCollectionGroup_s'
          type: 'string'
          displayName: 'RuleCollectionGroup_s'
        }
        {
          name: 'RuleCollection_s'
          type: 'string'
          displayName: 'RuleCollection_s'
        }
        {
          name: 'Rule_s'
          type: 'string'
          displayName: 'Rule_s'
        }
        {
          name: 'ActionReason_s'
          type: 'string'
          displayName: 'ActionReason_s'
        }
        {
          name: 'SubscriptionId'
          type: 'guid'
          displayName: 'SubscriptionId'
        }
        {
          name: 'ResourceGroup'
          type: 'string'
          displayName: 'ResourceGroup'
        }
        {
          name: 'ResourceProvider'
          type: 'string'
          displayName: 'ResourceProvider'
        }
        {
          name: 'Resource'
          type: 'string'
          displayName: 'Resource'
        }
        {
          name: 'ResourceType'
          type: 'string'
          displayName: 'ResourceType'
        }
        {
          name: '_CustomFieldsCollection'
          type: 'dynamic'
          displayName: 'AdditionalFields'
        }
      ]
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AzureLoadTestingOperation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AzureLoadTestingOperation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AzureLoadTestingOperation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AzureMetrics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AzureMetrics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AzureMetrics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_AzureMetricsV2 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'AzureMetricsV2'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'AzureMetricsV2'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_BaiClusterEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'BaiClusterEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'BaiClusterEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_BaiClusterNodeEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'BaiClusterNodeEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'BaiClusterNodeEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_BaiJobEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'BaiJobEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'BaiJobEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_BlockchainApplicationLog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'BlockchainApplicationLog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'BlockchainApplicationLog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_BlockchainProxyLog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'BlockchainProxyLog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'BlockchainProxyLog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_CassandraAudit 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'CassandraAudit'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'CassandraAudit'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_CassandraLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'CassandraLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'CassandraLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_CCFApplicationLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'CCFApplicationLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'CCFApplicationLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_CDBCassandraRequests 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'CDBCassandraRequests'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'CDBCassandraRequests'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_CDBControlPlaneRequests 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'CDBControlPlaneRequests'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'CDBControlPlaneRequests'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_CDBDataPlaneRequests 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'CDBDataPlaneRequests'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'CDBDataPlaneRequests'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_CDBGremlinRequests 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'CDBGremlinRequests'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'CDBGremlinRequests'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_CDBMongoRequests 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'CDBMongoRequests'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'CDBMongoRequests'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_CDBPartitionKeyRUConsumption 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'CDBPartitionKeyRUConsumption'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'CDBPartitionKeyRUConsumption'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_CDBPartitionKeyStatistics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'CDBPartitionKeyStatistics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'CDBPartitionKeyStatistics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_CDBQueryRuntimeStatistics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'CDBQueryRuntimeStatistics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'CDBQueryRuntimeStatistics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ChaosStudioExperimentEventLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ChaosStudioExperimentEventLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ChaosStudioExperimentEventLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_CHSMManagementAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'CHSMManagementAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'CHSMManagementAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_CIEventsAudit 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'CIEventsAudit'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'CIEventsAudit'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_CIEventsOperational 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'CIEventsOperational'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'CIEventsOperational'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ComputerGroup 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ComputerGroup'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ComputerGroup'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ContainerAppConsoleLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ContainerAppConsoleLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ContainerAppConsoleLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ContainerAppSystemLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ContainerAppSystemLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ContainerAppSystemLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ContainerEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ContainerEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ContainerEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ContainerImageInventory 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ContainerImageInventory'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ContainerImageInventory'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ContainerInstanceLog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ContainerInstanceLog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ContainerInstanceLog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ContainerInventory 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ContainerInventory'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ContainerInventory'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ContainerLog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ContainerLog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ContainerLog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ContainerLogV2 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ContainerLogV2'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ContainerLogV2'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ContainerNodeInventory 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ContainerNodeInventory'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ContainerNodeInventory'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ContainerRegistryLoginEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ContainerRegistryLoginEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ContainerRegistryLoginEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ContainerRegistryRepositoryEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ContainerRegistryRepositoryEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ContainerRegistryRepositoryEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ContainerServiceLog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ContainerServiceLog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ContainerServiceLog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_CoreAzureBackup 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'CoreAzureBackup'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'CoreAzureBackup'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksAccounts 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksAccounts'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksAccounts'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksBrickStoreHttpGateway 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksBrickStoreHttpGateway'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksBrickStoreHttpGateway'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksCapsule8Dataplane 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksCapsule8Dataplane'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksCapsule8Dataplane'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksClamAVScan 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksClamAVScan'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksClamAVScan'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksCloudStorageMetadata 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksCloudStorageMetadata'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksCloudStorageMetadata'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksClusterLibraries 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksClusterLibraries'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksClusterLibraries'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksClusters 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksClusters'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksClusters'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksDashboards 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksDashboards'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksDashboards'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksDatabricksSQL 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksDatabricksSQL'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksDatabricksSQL'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksDataMonitoring 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksDataMonitoring'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksDataMonitoring'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksDBFS 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksDBFS'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksDBFS'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksDeltaPipelines 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksDeltaPipelines'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksDeltaPipelines'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksFeatureStore 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksFeatureStore'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksFeatureStore'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksFilesystem 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksFilesystem'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksFilesystem'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksGenie 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksGenie'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksGenie'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksGitCredentials 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksGitCredentials'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksGitCredentials'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksGlobalInitScripts 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksGlobalInitScripts'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksGlobalInitScripts'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksIAMRole 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksIAMRole'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksIAMRole'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksIngestion 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksIngestion'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksIngestion'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksInstancePools 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksInstancePools'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksInstancePools'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksJobs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksJobs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksJobs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksLineageTracking 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksLineageTracking'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksLineageTracking'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksMarketplaceConsumer 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksMarketplaceConsumer'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksMarketplaceConsumer'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksMLflowAcledArtifact 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksMLflowAcledArtifact'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksMLflowAcledArtifact'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksMLflowExperiment 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksMLflowExperiment'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksMLflowExperiment'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksModelRegistry 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksModelRegistry'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksModelRegistry'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksNotebook 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksNotebook'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksNotebook'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksPartnerHub 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksPartnerHub'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksPartnerHub'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksPredictiveOptimization 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksPredictiveOptimization'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksPredictiveOptimization'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksRemoteHistoryService 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksRemoteHistoryService'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksRemoteHistoryService'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksRepos 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksRepos'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksRepos'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksSecrets 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksSecrets'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksSecrets'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksServerlessRealTimeInference 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksServerlessRealTimeInference'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksServerlessRealTimeInference'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksSQL 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksSQL'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksSQL'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksSQLPermissions 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksSQLPermissions'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksSQLPermissions'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksSSH 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksSSH'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksSSH'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksTables 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksTables'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksTables'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksUnityCatalog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksUnityCatalog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksUnityCatalog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksWebTerminal 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksWebTerminal'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksWebTerminal'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DatabricksWorkspace 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DatabricksWorkspace'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DatabricksWorkspace'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DataTransferOperations 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DataTransferOperations'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DataTransferOperations'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DCRLogErrors 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DCRLogErrors'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DCRLogErrors'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DCRLogTroubleshooting 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DCRLogTroubleshooting'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DCRLogTroubleshooting'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DevCenterBillingEventLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DevCenterBillingEventLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DevCenterBillingEventLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DevCenterDiagnosticLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DevCenterDiagnosticLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DevCenterDiagnosticLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DevCenterResourceOperationLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DevCenterResourceOperationLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DevCenterResourceOperationLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DNSQueryLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DNSQueryLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DNSQueryLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DSMAzureBlobStorageLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DSMAzureBlobStorageLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DSMAzureBlobStorageLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DSMDataClassificationLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DSMDataClassificationLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DSMDataClassificationLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_DSMDataLabelingLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'DSMDataLabelingLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'DSMDataLabelingLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_EGNFailedMqttConnections 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'EGNFailedMqttConnections'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'EGNFailedMqttConnections'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_EGNFailedMqttPublishedMessages 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'EGNFailedMqttPublishedMessages'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'EGNFailedMqttPublishedMessages'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_EGNFailedMqttSubscriptions 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'EGNFailedMqttSubscriptions'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'EGNFailedMqttSubscriptions'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_EGNMqttDisconnections 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'EGNMqttDisconnections'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'EGNMqttDisconnections'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_EGNSuccessfulMqttConnections 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'EGNSuccessfulMqttConnections'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'EGNSuccessfulMqttConnections'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_EnrichedMicrosoft365AuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'EnrichedMicrosoft365AuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'EnrichedMicrosoft365AuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ETWEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ETWEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ETWEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_Event 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'Event'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'Event'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ExchangeAssessmentRecommendation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ExchangeAssessmentRecommendation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ExchangeAssessmentRecommendation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ExchangeOnlineAssessmentRecommendation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ExchangeOnlineAssessmentRecommendation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ExchangeOnlineAssessmentRecommendation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_FailedIngestion 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'FailedIngestion'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'FailedIngestion'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_FunctionAppLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'FunctionAppLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'FunctionAppLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightAmbariClusterAlerts 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightAmbariClusterAlerts'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightAmbariClusterAlerts'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightAmbariSystemMetrics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightAmbariSystemMetrics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightAmbariSystemMetrics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightGatewayAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightGatewayAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightGatewayAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightHadoopAndYarnLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightHadoopAndYarnLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightHadoopAndYarnLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightHadoopAndYarnMetrics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightHadoopAndYarnMetrics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightHadoopAndYarnMetrics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightHBaseLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightHBaseLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightHBaseLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightHBaseMetrics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightHBaseMetrics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightHBaseMetrics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightHiveAndLLAPLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightHiveAndLLAPLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightHiveAndLLAPLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightHiveAndLLAPMetrics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightHiveAndLLAPMetrics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightHiveAndLLAPMetrics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightHiveQueryAppStats 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightHiveQueryAppStats'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightHiveQueryAppStats'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightHiveTezAppStats 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightHiveTezAppStats'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightHiveTezAppStats'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightJupyterNotebookEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightJupyterNotebookEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightJupyterNotebookEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightKafkaLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightKafkaLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightKafkaLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightKafkaMetrics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightKafkaMetrics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightKafkaMetrics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightKafkaServerLog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightKafkaServerLog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightKafkaServerLog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightOozieLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightOozieLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightOozieLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightRangerAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightRangerAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightRangerAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightSecurityLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightSecurityLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightSecurityLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightSparkApplicationEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightSparkApplicationEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightSparkApplicationEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightSparkBlockManagerEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightSparkBlockManagerEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightSparkBlockManagerEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightSparkEnvironmentEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightSparkEnvironmentEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightSparkEnvironmentEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightSparkExecutorEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightSparkExecutorEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightSparkExecutorEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightSparkExtraEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightSparkExtraEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightSparkExtraEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightSparkJobEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightSparkJobEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightSparkJobEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightSparkLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightSparkLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightSparkLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightSparkSQLExecutionEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightSparkSQLExecutionEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightSparkSQLExecutionEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightSparkStageEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightSparkStageEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightSparkStageEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightSparkStageTaskAccumulables 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightSparkStageTaskAccumulables'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightSparkStageTaskAccumulables'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightSparkTaskEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightSparkTaskEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightSparkTaskEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightStormLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightStormLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightStormLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightStormMetrics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightStormMetrics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightStormMetrics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HDInsightStormTopologyMetrics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HDInsightStormTopologyMetrics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HDInsightStormTopologyMetrics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_HealthStateChangeEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'HealthStateChangeEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'HealthStateChangeEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_Heartbeat 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'Heartbeat'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'Heartbeat'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_InsightsMetrics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'InsightsMetrics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'InsightsMetrics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_IntuneAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'IntuneAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'IntuneAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_IntuneDeviceComplianceOrg 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'IntuneDeviceComplianceOrg'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'IntuneDeviceComplianceOrg'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_IntuneDevices 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'IntuneDevices'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'IntuneDevices'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_IntuneOperationalLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'IntuneOperationalLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'IntuneOperationalLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_KubeEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'KubeEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'KubeEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_KubeHealth 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'KubeHealth'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'KubeHealth'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_KubeMonAgentEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'KubeMonAgentEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'KubeMonAgentEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_KubeNodeInventory 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'KubeNodeInventory'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'KubeNodeInventory'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_KubePodInventory 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'KubePodInventory'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'KubePodInventory'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_KubePVInventory 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'KubePVInventory'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'KubePVInventory'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_KubeServices 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'KubeServices'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'KubeServices'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LAQueryLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LAQueryLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'LAQueryLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LASummaryLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LASummaryLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'LASummaryLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_LogicAppWorkflowRuntime 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'LogicAppWorkflowRuntime'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'LogicAppWorkflowRuntime'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_MCCEventLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'MCCEventLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'MCCEventLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_MCVPAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'MCVPAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'MCVPAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_MCVPOperationLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'MCVPOperationLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'MCVPOperationLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_MDCFileIntegrityMonitoringEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'MDCFileIntegrityMonitoringEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'MDCFileIntegrityMonitoringEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_MDECustomCollectionDeviceFileEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'MDECustomCollectionDeviceFileEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'MDECustomCollectionDeviceFileEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_MicrosoftAzureBastionAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'MicrosoftAzureBastionAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'MicrosoftAzureBastionAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_MicrosoftDataShareReceivedSnapshotLog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'MicrosoftDataShareReceivedSnapshotLog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'MicrosoftDataShareReceivedSnapshotLog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_MicrosoftDataShareSentSnapshotLog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'MicrosoftDataShareSentSnapshotLog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'MicrosoftDataShareSentSnapshotLog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_MicrosoftDataShareShareLog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'MicrosoftDataShareShareLog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'MicrosoftDataShareShareLog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_MicrosoftDynamicsTelemetryPerformanceLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'MicrosoftDynamicsTelemetryPerformanceLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'MicrosoftDynamicsTelemetryPerformanceLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_MicrosoftDynamicsTelemetrySystemMetricsLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'MicrosoftDynamicsTelemetrySystemMetricsLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'MicrosoftDynamicsTelemetrySystemMetricsLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_MicrosoftGraphActivityLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'MicrosoftGraphActivityLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'MicrosoftGraphActivityLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_MicrosoftHealthcareApisAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'MicrosoftHealthcareApisAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'MicrosoftHealthcareApisAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_MNFDeviceUpdates 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'MNFDeviceUpdates'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'MNFDeviceUpdates'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_MNFSystemSessionHistoryUpdates 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'MNFSystemSessionHistoryUpdates'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'MNFSystemSessionHistoryUpdates'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_MNFSystemStateMessageUpdates 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'MNFSystemStateMessageUpdates'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'MNFSystemStateMessageUpdates'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NCBMBreakGlassAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NCBMBreakGlassAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NCBMBreakGlassAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NCBMSecurityDefenderLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NCBMSecurityDefenderLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NCBMSecurityDefenderLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NCBMSecurityLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NCBMSecurityLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NCBMSecurityLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NCBMSystemLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NCBMSystemLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NCBMSystemLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NCCKubernetesLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NCCKubernetesLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NCCKubernetesLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NCCVMOrchestrationLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NCCVMOrchestrationLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NCCVMOrchestrationLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NCSStorageAlerts 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NCSStorageAlerts'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NCSStorageAlerts'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NCSStorageLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NCSStorageLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NCSStorageLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NetworkAccessTraffic 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NetworkAccessTraffic'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NetworkAccessTraffic'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NGXOperationLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NGXOperationLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NGXOperationLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NSPAccessLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NSPAccessLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NSPAccessLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NTAInsights 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NTAInsights'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NTAInsights'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NTAIpDetails 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NTAIpDetails'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NTAIpDetails'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NTANetAnalytics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NTANetAnalytics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NTANetAnalytics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NTATopologyDetails 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NTATopologyDetails'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NTATopologyDetails'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NWConnectionMonitorDestinationListenerResult 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NWConnectionMonitorDestinationListenerResult'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NWConnectionMonitorDestinationListenerResult'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NWConnectionMonitorDNSResult 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NWConnectionMonitorDNSResult'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NWConnectionMonitorDNSResult'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NWConnectionMonitorPathResult 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NWConnectionMonitorPathResult'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NWConnectionMonitorPathResult'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_NWConnectionMonitorTestResult 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'NWConnectionMonitorTestResult'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'NWConnectionMonitorTestResult'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_OEPAirFlowTask 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'OEPAirFlowTask'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'OEPAirFlowTask'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_OEPAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'OEPAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'OEPAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_OEPDataplaneLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'OEPDataplaneLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'OEPDataplaneLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_OEPElasticOperator 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'OEPElasticOperator'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'OEPElasticOperator'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_OEPElasticsearch 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'OEPElasticsearch'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'OEPElasticsearch'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_OLPSupplyChainEntityOperations 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'OLPSupplyChainEntityOperations'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'OLPSupplyChainEntityOperations'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_OLPSupplyChainEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'OLPSupplyChainEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'OLPSupplyChainEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_Operation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'Operation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'Operation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_Perf 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'Perf'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'Perf'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_PFTitleAuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'PFTitleAuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'PFTitleAuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_PowerBIAuditTenant 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'PowerBIAuditTenant'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'PowerBIAuditTenant'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_PowerBIDatasetsTenant 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'PowerBIDatasetsTenant'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'PowerBIDatasetsTenant'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_PowerBIDatasetsTenantPreview 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'PowerBIDatasetsTenantPreview'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'PowerBIDatasetsTenantPreview'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_PowerBIDatasetsWorkspace 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'PowerBIDatasetsWorkspace'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'PowerBIDatasetsWorkspace'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_PowerBIDatasetsWorkspacePreview 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'PowerBIDatasetsWorkspacePreview'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'PowerBIDatasetsWorkspacePreview'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_PowerBIReportUsageTenant 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'PowerBIReportUsageTenant'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'PowerBIReportUsageTenant'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_PowerBIReportUsageWorkspace 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'PowerBIReportUsageWorkspace'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'PowerBIReportUsageWorkspace'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_PurviewDataSensitivityLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'PurviewDataSensitivityLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'PurviewDataSensitivityLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_PurviewScanStatusLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'PurviewScanStatusLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'PurviewScanStatusLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_PurviewSecurityLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'PurviewSecurityLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'PurviewSecurityLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_REDConnectionEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'REDConnectionEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'REDConnectionEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_RemoteNetworkHealthLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'RemoteNetworkHealthLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'RemoteNetworkHealthLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ResourceManagementPublicAccessLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ResourceManagementPublicAccessLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ResourceManagementPublicAccessLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SCCMAssessmentRecommendation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SCCMAssessmentRecommendation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SCCMAssessmentRecommendation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SCOMAssessmentRecommendation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SCOMAssessmentRecommendation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SCOMAssessmentRecommendation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ServiceFabricOperationalEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ServiceFabricOperationalEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ServiceFabricOperationalEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ServiceFabricReliableActorEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ServiceFabricReliableActorEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ServiceFabricReliableActorEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_ServiceFabricReliableServiceEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'ServiceFabricReliableServiceEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'ServiceFabricReliableServiceEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SfBAssessmentRecommendation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SfBAssessmentRecommendation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SfBAssessmentRecommendation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SfBOnlineAssessmentRecommendation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SfBOnlineAssessmentRecommendation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SfBOnlineAssessmentRecommendation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SharePointOnlineAssessmentRecommendation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SharePointOnlineAssessmentRecommendation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SharePointOnlineAssessmentRecommendation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SignalRServiceDiagnosticLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SignalRServiceDiagnosticLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SignalRServiceDiagnosticLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SigninLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SigninLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SigninLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SPAssessmentRecommendation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SPAssessmentRecommendation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SPAssessmentRecommendation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SQLAssessmentRecommendation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SQLAssessmentRecommendation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SQLAssessmentRecommendation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SQLSecurityAuditEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SQLSecurityAuditEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SQLSecurityAuditEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_StorageAntimalwareScanResults 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'StorageAntimalwareScanResults'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'StorageAntimalwareScanResults'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_StorageBlobLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'StorageBlobLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'StorageBlobLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_StorageCacheOperationEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'StorageCacheOperationEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'StorageCacheOperationEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_StorageCacheUpgradeEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'StorageCacheUpgradeEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'StorageCacheUpgradeEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_StorageCacheWarningEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'StorageCacheWarningEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'StorageCacheWarningEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_StorageFileLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'StorageFileLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'StorageFileLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_StorageMalwareScanningResults 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'StorageMalwareScanningResults'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'StorageMalwareScanningResults'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_StorageMoverCopyLogsFailed 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'StorageMoverCopyLogsFailed'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'StorageMoverCopyLogsFailed'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_StorageMoverCopyLogsTransferred 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'StorageMoverCopyLogsTransferred'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'StorageMoverCopyLogsTransferred'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_StorageMoverJobRunLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'StorageMoverJobRunLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'StorageMoverJobRunLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_StorageQueueLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'StorageQueueLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'StorageQueueLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_StorageTableLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'StorageTableLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'StorageTableLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SucceededIngestion 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SucceededIngestion'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SucceededIngestion'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseBigDataPoolApplicationsEnded 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseBigDataPoolApplicationsEnded'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseBigDataPoolApplicationsEnded'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseBuiltinSqlPoolRequestsEnded 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseBuiltinSqlPoolRequestsEnded'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseBuiltinSqlPoolRequestsEnded'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseDXCommand 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseDXCommand'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseDXCommand'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseDXFailedIngestion 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseDXFailedIngestion'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseDXFailedIngestion'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseDXIngestionBatching 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseDXIngestionBatching'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseDXIngestionBatching'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseDXQuery 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseDXQuery'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseDXQuery'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseDXSucceededIngestion 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseDXSucceededIngestion'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseDXSucceededIngestion'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseDXTableDetails 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseDXTableDetails'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseDXTableDetails'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseDXTableUsageStatistics 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseDXTableUsageStatistics'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseDXTableUsageStatistics'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseGatewayApiRequests 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseGatewayApiRequests'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseGatewayApiRequests'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseGatewayEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseGatewayEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseGatewayEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseIntegrationActivityRuns 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseIntegrationActivityRuns'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseIntegrationActivityRuns'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseIntegrationActivityRunsEnded 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseIntegrationActivityRunsEnded'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseIntegrationActivityRunsEnded'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseIntegrationPipelineRuns 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseIntegrationPipelineRuns'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseIntegrationPipelineRuns'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseIntegrationPipelineRunsEnded 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseIntegrationPipelineRunsEnded'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseIntegrationPipelineRunsEnded'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseIntegrationTriggerRuns 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseIntegrationTriggerRuns'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseIntegrationTriggerRuns'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseIntegrationTriggerRunsEnded 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseIntegrationTriggerRunsEnded'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseIntegrationTriggerRunsEnded'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseLinkEvent 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseLinkEvent'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseLinkEvent'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseRBACEvents 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseRBACEvents'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseRBACEvents'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseRbacOperations 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseRbacOperations'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseRbacOperations'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseScopePoolScopeJobsEnded 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseScopePoolScopeJobsEnded'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseScopePoolScopeJobsEnded'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseScopePoolScopeJobsStateChange 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseScopePoolScopeJobsStateChange'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseScopePoolScopeJobsStateChange'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseSqlPoolDmsWorkers 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseSqlPoolDmsWorkers'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseSqlPoolDmsWorkers'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseSqlPoolExecRequests 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseSqlPoolExecRequests'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseSqlPoolExecRequests'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseSqlPoolRequestSteps 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseSqlPoolRequestSteps'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseSqlPoolRequestSteps'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseSqlPoolSqlRequests 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseSqlPoolSqlRequests'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseSqlPoolSqlRequests'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_SynapseSqlPoolWaits 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'SynapseSqlPoolWaits'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'SynapseSqlPoolWaits'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_Syslog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'Syslog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'Syslog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_TSIIngress 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'TSIIngress'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'TSIIngress'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_UCClient 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'UCClient'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'UCClient'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_UCClientReadinessStatus 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'UCClientReadinessStatus'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'UCClientReadinessStatus'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_UCClientUpdateStatus 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'UCClientUpdateStatus'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'UCClientUpdateStatus'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_UCDeviceAlert 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'UCDeviceAlert'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'UCDeviceAlert'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_UCDOAggregatedStatus 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'UCDOAggregatedStatus'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'UCDOAggregatedStatus'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_UCDOStatus 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'UCDOStatus'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'UCDOStatus'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_UCServiceUpdateStatus 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'UCServiceUpdateStatus'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'UCServiceUpdateStatus'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_UCUpdateAlert 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'UCUpdateAlert'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'UCUpdateAlert'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_Usage 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'Usage'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'Usage'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_VCoreMongoRequests 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'VCoreMongoRequests'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'VCoreMongoRequests'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_VIAudit 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'VIAudit'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'VIAudit'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_VIIndexing 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'VIIndexing'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'VIIndexing'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_VMBoundPort 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'VMBoundPort'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'VMBoundPort'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_VMComputer 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'VMComputer'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'VMComputer'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_VMConnection 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'VMConnection'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'VMConnection'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_VMProcess 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'VMProcess'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'VMProcess'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_W3CIISLog 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'W3CIISLog'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'W3CIISLog'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_WebPubSubConnectivity 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'WebPubSubConnectivity'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'WebPubSubConnectivity'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_WebPubSubHttpRequest 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'WebPubSubHttpRequest'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'WebPubSubHttpRequest'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_WebPubSubMessaging 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'WebPubSubMessaging'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'WebPubSubMessaging'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_Windows365AuditLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'Windows365AuditLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'Windows365AuditLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_WindowsClientAssessmentRecommendation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'WindowsClientAssessmentRecommendation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'WindowsClientAssessmentRecommendation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_WindowsServerAssessmentRecommendation 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'WindowsServerAssessmentRecommendation'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'WindowsServerAssessmentRecommendation'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_WorkloadDiagnosticLogs 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'WorkloadDiagnosticLogs'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'WorkloadDiagnosticLogs'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_WVDAgentHealthStatus 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'WVDAgentHealthStatus'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'WVDAgentHealthStatus'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_WVDAutoscaleEvaluationPooled 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'WVDAutoscaleEvaluationPooled'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'WVDAutoscaleEvaluationPooled'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_WVDCheckpoints 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'WVDCheckpoints'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'WVDCheckpoints'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_WVDConnectionGraphicsDataPreview 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'WVDConnectionGraphicsDataPreview'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'WVDConnectionGraphicsDataPreview'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_WVDConnectionNetworkData 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'WVDConnectionNetworkData'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'WVDConnectionNetworkData'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_WVDConnections 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'WVDConnections'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'WVDConnections'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_WVDErrors 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'WVDErrors'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'WVDErrors'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_WVDFeeds 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'WVDFeeds'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'WVDFeeds'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_WVDHostRegistrations 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'WVDHostRegistrations'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'WVDHostRegistrations'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_WVDManagement 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'WVDManagement'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'WVDManagement'
    }
    retentionInDays: 365
  }
}

resource workspaces_law_BTCCentralHub_dev_uksouth_001_name_WVDSessionHostManagement 'Microsoft.OperationalInsights/workspaces/tables@2021-12-01-preview' = {
  parent: workspaces_law_BTCCentralHub_dev_uksouth_001_name_resource
  name: 'WVDSessionHostManagement'
  properties: {
    totalRetentionInDays: 365
    plan: 'Analytics'
    schema: {
      name: 'WVDSessionHostManagement'
    }
    retentionInDays: 365
  }
}

resource storageAccounts_stbtccentralhubdev001_name_default 'Microsoft.Storage/storageAccounts/blobServices@2023-04-01' = {
  parent: storageAccounts_stbtccentralhubdev001_name_resource
  name: 'default'
  sku: {
    name: 'Standard_LRS'
    tier: 'Standard'
  }
  properties: {
    cors: {
      corsRules: []
    }
    deleteRetentionPolicy: {
      allowPermanentDelete: false
      enabled: false
    }
  }
}

resource Microsoft_Storage_storageAccounts_fileServices_storageAccounts_stbtccentralhubdev001_name_default 'Microsoft.Storage/storageAccounts/fileServices@2023-04-01' = {
  parent: storageAccounts_stbtccentralhubdev001_name_resource
  name: 'default'
  sku: {
    name: 'Standard_LRS'
    tier: 'Standard'
  }
  properties: {
    protocolSettings: {
      smb: {}
    }
    cors: {
      corsRules: []
    }
    shareDeleteRetentionPolicy: {
      enabled: true
      days: 7
    }
  }
}

resource Microsoft_Storage_storageAccounts_queueServices_storageAccounts_stbtccentralhubdev001_name_default 'Microsoft.Storage/storageAccounts/queueServices@2023-04-01' = {
  parent: storageAccounts_stbtccentralhubdev001_name_resource
  name: 'default'
  properties: {
    cors: {
      corsRules: []
    }
  }
}

resource Microsoft_Storage_storageAccounts_tableServices_storageAccounts_stbtccentralhubdev001_name_default 'Microsoft.Storage/storageAccounts/tableServices@2023-04-01' = {
  parent: storageAccounts_stbtccentralhubdev001_name_resource
  name: 'default'
  properties: {
    cors: {
      corsRules: []
    }
  }
}

resource bastionHosts_bastion_btccentralhub_dev_uksouth_001_name_resource 'Microsoft.Network/bastionHosts@2023-09-01' = {
  name: bastionHosts_bastion_btccentralhub_dev_uksouth_001_name
  location: 'uksouth'
  tags: {
    Environment: 'dev'
    WorkloadName: 'BTCCentralHub'
    BusinessCriticality: 'medium'
    CostCentre: 'csu'
    Owner: 'Quberatron'
    DataClassification: 'general'
  }
  sku: {
    name: 'Basic'
  }
  properties: {
    dnsName: 'bst-31229ec3-37ea-4ae2-aaa6-0b726067a351.bastion.azure.com'
    scaleUnits: 2
    enableKerberos: false
    ipConfigurations: [
      {
        name: 'IpConfAzureBastionSubnet'
        id: '${bastionHosts_bastion_btccentralhub_dev_uksouth_001_name_resource.id}/bastionHostIpConfigurations/IpConfAzureBastionSubnet'
        properties: {
          privateIPAllocationMethod: 'Dynamic'
          publicIPAddress: {
            id: publicIPAddresses_pip_btccentralhub_dev_uksouth_001_name_resource.id
          }
          subnet: {
            id: virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_AzureBastionSubnet.id
          }
        }
      }
    ]
  }
}

resource firewallPolicies_fwpol_btccentralhub_dev_uksouth_001_name_DefaultApplicationRuleCollectionGroup 'Microsoft.Network/firewallPolicies/ruleCollectionGroups@2023-09-01' = {
  parent: firewallPolicies_fwpol_btccentralhub_dev_uksouth_001_name_resource
  name: 'DefaultApplicationRuleCollectionGroup'
  location: 'uksouth'
  properties: {
    priority: 300
    ruleCollections: [
      {
        ruleCollectionType: 'FirewallPolicyFilterRuleCollection'
        action: {
          type: 'Allow'
        }
        rules: [
          {
            ruleType: 'ApplicationRule'
            name: 'AllWebOut'
            protocols: [
              {
                protocolType: 'Http'
                port: 80
              }
              {
                protocolType: 'Https'
                port: 443
              }
            ]
            fqdnTags: []
            webCategories: []
            targetFqdns: [
              '*'
            ]
            targetUrls: []
            terminateTLS: false
            sourceAddresses: []
            destinationAddresses: []
            sourceIpGroups: [
              ipGroups_ipg_btccentralhub_dev_uksouth_001_name_resource.id
            ]
            httpHeadersToInsert: []
          }
        ]
        name: 'InternetTraffic'
        priority: 100
      }
    ]
  }
}

resource firewallPolicies_fwpol_btccentralhub_dev_uksouth_001_name_DefaultNetworkRuleCollectionGroup 'Microsoft.Network/firewallPolicies/ruleCollectionGroups@2023-09-01' = {
  parent: firewallPolicies_fwpol_btccentralhub_dev_uksouth_001_name_resource
  name: 'DefaultNetworkRuleCollectionGroup'
  location: 'uksouth'
  properties: {
    priority: 100
    ruleCollections: [
      {
        ruleCollectionType: 'FirewallPolicyFilterRuleCollection'
        action: {
          type: 'Allow'
        }
        rules: [
          {
            ruleType: 'NetworkRule'
            name: 'Allow-AllToEntraDS'
            ipProtocols: [
              'Any'
            ]
            sourceAddresses: []
            sourceIpGroups: [
              ipGroups_ipg_btccentralhub_dev_uksouth_001_name_resource.id
            ]
            destinationAddresses: [
              '10.99.1.0/24'
            ]
            destinationIpGroups: []
            destinationFqdns: []
            destinationPorts: [
              '*'
            ]
          }
          {
            ruleType: 'NetworkRule'
            name: 'Allow-EntraDSToSpokes'
            ipProtocols: [
              'Any'
            ]
            sourceAddresses: [
              '10.99.1.0/24'
            ]
            sourceIpGroups: []
            destinationAddresses: []
            destinationIpGroups: [
              ipGroups_ipg_btccentralhub_dev_uksouth_001_name_resource.id
            ]
            destinationFqdns: []
            destinationPorts: [
              '*'
            ]
          }
        ]
        name: 'BTC-Spokes'
        priority: 100
      }
    ]
  }
}

resource storageAccounts_stbtccentralhubdev001_name_default_classroom 'Microsoft.Storage/storageAccounts/fileServices/shares@2023-04-01' = {
  parent: Microsoft_Storage_storageAccounts_fileServices_storageAccounts_stbtccentralhubdev001_name_default
  name: 'classroom'
  properties: {
    accessTier: 'Hot'
    shareQuota: 5120
    enabledProtocols: 'SMB'
  }
  dependsOn: [
    storageAccounts_stbtccentralhubdev001_name_resource
  ]
}

resource storageAccounts_stbtccentralhubdev001_name_default_fslogix 'Microsoft.Storage/storageAccounts/fileServices/shares@2023-04-01' = {
  parent: Microsoft_Storage_storageAccounts_fileServices_storageAccounts_stbtccentralhubdev001_name_default
  name: 'fslogix'
  properties: {
    accessTier: 'Hot'
    shareQuota: 5120
    enabledProtocols: 'SMB'
  }
  dependsOn: [
    storageAccounts_stbtccentralhubdev001_name_resource
  ]
}

resource azureFirewalls_firewall_btccentralhub_dev_uksouth_001_name_resource 'Microsoft.Network/azureFirewalls@2023-09-01' = {
  name: azureFirewalls_firewall_btccentralhub_dev_uksouth_001_name
  location: 'uksouth'
  tags: {
    CostCentre: 'csu'
    BusinessCriticality: 'medium'
    Owner: 'Quberatron'
    DataClassification: 'general'
    WorkloadName: 'BTCCentralHub'
    Environment: 'dev'
  }
  zones: [
    '1'
    '2'
    '3'
  ]
  properties: {
    sku: {
      name: 'AZFW_VNet'
      tier: 'Basic'
    }
    threatIntelMode: 'Deny'
    additionalProperties: {}
    managementIpConfiguration: {
      name: 'AzureFirewallMgmtIpConfiguration'
      id: '${azureFirewalls_firewall_btccentralhub_dev_uksouth_001_name_resource.id}/azureFirewallIpConfigurations/AzureFirewallMgmtIpConfiguration'
      properties: {
        publicIPAddress: {
          id: publicIPAddresses_pip_btccentralhub_fwman_dev_uksouth_001_name_resource.id
        }
        subnet: {
          id: virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_AzureFirewallManagementSubnet.id
        }
      }
    }
    ipConfigurations: [
      {
        name: 'AzureFirewallIpConfiguration0'
        id: '${azureFirewalls_firewall_btccentralhub_dev_uksouth_001_name_resource.id}/azureFirewallIpConfigurations/AzureFirewallIpConfiguration0'
        properties: {
          publicIPAddress: {
            id: publicIPAddresses_pip_btccentralhub_fw_dev_uksouth_001_name_resource.id
          }
          subnet: {
            id: virtualNetworks_vnet_btccentralhub_dev_uksouth_001_name_AzureFirewallSubnet.id
          }
        }
      }
    ]
    networkRuleCollections: []
    applicationRuleCollections: []
    natRuleCollections: []
    firewallPolicy: {
      id: firewallPolicies_fwpol_btccentralhub_dev_uksouth_001_name_resource.id
    }
  }
}
