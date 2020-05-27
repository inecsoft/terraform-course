# Copyright (c) 2012-2018, Mark Peek <mark@peek.org>
# All rights reserved.
#
# See LICENSE file for full license.

from . import AWSObject, AWSProperty, Tags
from .validators import boolean


class AcceptedPortfolioShare(AWSObject):
    resource_type = "AWS::ServiceCatalog::AcceptedPortfolioShare"

    props = {
        'AcceptLanguage': (str, False),
        'PortfolioId': (str, True),
    }


class ProvisioningArtifactProperties(AWSProperty):
    props = {
        'Description': (str, False),
        'Info': (dict, True),
        'Name': (str, False),
    }


class CloudFormationProduct(AWSObject):
    resource_type = "AWS::ServiceCatalog::CloudFormationProduct"

    props = {
        'AcceptLanguage': (str, False),
        'Description': (str, False),
        'Distributor': (str, False),
        'Name': (str, True),
        'Owner': (str, True),
        'ProvisioningArtifactParameters':
            ([ProvisioningArtifactProperties], True),
        'SupportDescription': (str, False),
        'SupportEmail': (str, False),
        'SupportUrl': (str, False),
        'Tags': (Tags, False),
    }


class ProvisioningParameter(AWSProperty):
    props = {
        'Key': (str, False),
        'Value': (str, False),
    }


class CloudFormationProvisionedProduct(AWSObject):
    resource_type = "AWS::ServiceCatalog::CloudFormationProvisionedProduct"

    props = {
        'AcceptLanguage': (str, False),
        'NotificationArns': ([str], False),
        'PathId': (str, False),
        'ProductId': (str, False),
        'ProductName': (str, False),
        'ProvisionedProductName': (str, False),
        'ProvisioningArtifactId': (str, False),
        'ProvisioningArtifactName': (str, False),
        'ProvisioningParameters': ([ProvisioningParameter], False),
        'Tags': (Tags, False),
    }


class LaunchNotificationConstraint(AWSObject):
    resource_type = "AWS::ServiceCatalog::LaunchNotificationConstraint"

    props = {
        'AcceptLanguage': (str, False),
        'Description': (str, False),
        'NotificationArns': ([str], True),
        'PortfolioId': (str, True),
        'ProductId': (str, True),
    }


class LaunchRoleConstraint(AWSObject):
    resource_type = "AWS::ServiceCatalog::LaunchRoleConstraint"

    props = {
        'AcceptLanguage': (str, False),
        'Description': (str, False),
        'PortfolioId': (str, True),
        'ProductId': (str, True),
        'RoleArn': (str, True),
    }


class LaunchTemplateConstraint(AWSObject):
    resource_type = "AWS::ServiceCatalog::LaunchTemplateConstraint"

    props = {
        'AcceptLanguage': (str, False),
        'Description': (str, False),
        'PortfolioId': (str, True),
        'ProductId': (str, True),
        'Rules': (str, True),
    }


class Portfolio(AWSObject):
    resource_type = "AWS::ServiceCatalog::Portfolio"

    props = {
        'AcceptLanguage': (str, False),
        'Description': (str, False),
        'DisplayName': (str, True),
        'ProviderName': (str, True),
        'Tags': (Tags, False),
    }


class PortfolioPrincipalAssociation(AWSObject):
    resource_type = "AWS::ServiceCatalog::PortfolioPrincipalAssociation"

    props = {
        'AcceptLanguage': (str, False),
        'PortfolioId': (str, True),
        'PrincipalARN': (str, True),
        'PrincipalType': (str, True),
    }


class PortfolioProductAssociation(AWSObject):
    resource_type = "AWS::ServiceCatalog::PortfolioProductAssociation"

    props = {
        'AcceptLanguage': (str, False),
        'PortfolioId': (str, True),
        'ProductId': (str, True),
        'SourcePortfolioId': (str, False),
    }


class PortfolioShare(AWSObject):
    resource_type = "AWS::ServiceCatalog::PortfolioShare"

    props = {
        'AcceptLanguage': (str, False),
        'AccountId': (str, True),
        'PortfolioId': (str, True),
    }


class TagOption(AWSObject):
    resource_type = "AWS::ServiceCatalog::TagOption"

    props = {
        'Active': (boolean, False),
        'Key': (str, True),
        'Value': (str, True),
    }


class TagOptionAssociation(AWSObject):
    resource_type = "AWS::ServiceCatalog::TagOptionAssociation"

    props = {
        'ResourceId': (str, True),
        'TagOptionId': (str, True),
    }
