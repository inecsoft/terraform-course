# #!/usr/bin/env python3
# import os

# import aws_cdk as cdk

# from django_app.django_app_stack import DjangoAppStack


# app = cdk.App()
# DjangoAppStack(app, "DjangoAppStack",
#     stage_name = "dev"
#     # If you don't specify 'env', this stack will be environment-agnostic.
#     # Account/Region-dependent features and context lookups will not work,
#     # but a single synthesized template can be deployed anywhere.

#     # Uncomment the next line to specialize this stack for the AWS Account
#     # and Region that are implied by the current CLI configuration.

#     #env=cdk.Environment(account=os.getenv('CDK_DEFAULT_ACCOUNT'), region=os.getenv('CDK_DEFAULT_REGION')),

#     # Uncomment the next line if you know exactly what Account and Region you
#     # want to deploy the stack to. */

#     #env=cdk.Environment(account='123456789012', region='us-east-1'),

#     # For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html
#     )

# app.synth()

#!/usr/bin/env python3
import os
import aws_cdk as cdk
from aws_cdk import (
    Environment,
)
from django_app.pipeline_stack import MyDjangoAppPipelineStack
from django_app.network_stack import NetworkStack
from django_app.database_stack import DatabaseStack

app = cdk.App()
net = NetworkStack(
    app,
    "NetworkStack",
    env=Environment(
        account=os.getenv('CDK_DEFAULT_ACCOUNT'),
        region=os.getenv('CDK_DEFAULT_REGION')
    ),
)

# Database = DatabaseStack(
#     app,
#     "DatabaseStack",
#     vpc=net.vpc,
#     database_name = "db_prod",
#     env=Environment(
#         account=os.getenv('CDK_DEFAULT_ACCOUNT'),
#         region=os.getenv('CDK_DEFAULT_REGION')
#     ),

# )

# DjangoAppPipelineStage = MyDjangoAppPipelineStack(
#     app,
#     "MyDjangoAppPipelineStage",
#     django_debug = "True",
#     domain_name = "dumy.transport-for-greater-manchester.com",
#     subdomain = "django-app",
#     django_settings_module = "app.settings.prod",
#     env=Environment(
#         account=os.getenv('CDK_DEFAULT_ACCOUNT'),
#         region=os.getenv('CDK_DEFAULT_REGION')
#     ),
# )


# pipeline = MyDjangoAppPipelineStack(
#     app,
#     "MyDjangoAppPipeline",
#     repository="marianobrc/scalable-django-apps",
#     branch="master",
#     ssm_gh_connection_param="/Github/Connection",
#     env=Environment(
#         account=os.getenv('CDK_DEFAULT_ACCOUNT'),
#         region=os.getenv('CDK_DEFAULT_REGION')
#     ),
# )
app.synth()