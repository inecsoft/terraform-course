import { Construct } from 'constructs';

import * as cdk from 'aws-cdk-lib';

const path = require('path')
import * as aws_apigateway2 from '@aws-cdk/aws-apigatewayv2-alpha';

// import { HttpUrlIntegration, HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
// import aws_apigateway2 from @aws-cdk/aws-apigateway2;
import * as aws_apigatewayv2_integrations from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
// import aws_apigatewayv2_integrations from @aws-cdk/aws-apigatewayv2-integrations;

export class pythonLambdaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // aws lambda list-layers --profile ivan-arteaga-dev --region eu-west-1 | jq -r '.Layers[]'

    // defines an AWS Lambda resource
    const Lambda = new cdk.aws_lambda.DockerImageFunction(
      this,
      'PredictiveLambda',
      {
        code: cdk.aws_lambda.DockerImageCode.fromImageAsset(
          path.join(__dirname, '../model')
        ),
        memorySize: 4096,
        timeout: cdk.Duration.seconds(15),
      }
    );

    // defines an API Gateway Http API resource backed by our "PredictiveLambda" function.
    const api = new aws_apigateway2.HttpApi(this, 'Predictive Endpoint', {
      defaultIntegration:
        new aws_apigatewayv2_integrations.HttpLambdaIntegration({
          handler: Lambda,
        }),
    });

    new cdk.CfnOutput(this, 'HTTP API Url', {
      value: api.url ?? 'Something went wrong with the deploy',
    });

    const LambdaIntegration = new cdk.aws_apigateway.LambdaIntegration(Lambda, {
      allowTestInvoke: false,
    });
    api.root.addMethod('ANY', LambdaIntegration);

    api.root.addProxy({
      defaultIntegration: new cdk.aws_apigateway.LambdaIntegration(Lambda, {
        allowTestInvoke: false,
      }),
      anyMethod: true,
    });

    const nextLoggingBucket = new cdk.aws_s3.Bucket(
      this,
      'next-logging-bucket',
      {
        blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
        encryption: cdk.aws_s3.BucketEncryption.S3_MANAGED,
        versioned: true,
        accessControl: cdk.aws_s3.BucketAccessControl.LOG_DELIVERY_WRITE,
      }
    );

    const cloudfrontDistribution = new cdk.aws_cloudfront.Distribution(
      this,
      'Distribution',
      {
        defaultBehavior: {
          origin: new cdk.aws_cloudfront_origins.RestApiOrigin(api),
          viewerProtocolPolicy:
            cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cdk.aws_cloudfront.CachePolicy.CACHING_DISABLED,
        },
        minimumProtocolVersion:
          cdk.aws_cloudfront.SecurityPolicyProtocol.TLS_V1_2_2018,
        logBucket: nextLoggingBucket,
        logFilePrefix: 'cloudfront-access-logs',
      }
    );

    new cdk.CfnOutput(this, 'CloudFront URL', {
      value: `https://${cloudfrontDistribution.distributionDomainName}`,
    });
  }
}
