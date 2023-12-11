import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';

const path = require('path');
export class pythonLambdaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // aws lambda list-layers --profile ivan-arteaga-dev --region eu-west-1 | jq -r '.Layers[]'

    //define my dynamo table
    const table = cdk.aws_dynamodb.Table.fromTableName(
      this,
      'MoviesTable',
      'Movies'
    );
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

    // monitoring lambda
    if (Lambda.timeout) {
      new cdk.aws_cloudwatch.Alarm(this, `MyAlarm`, {
        metric: Lambda.metricDuration().with({
          statistic: 'Maximum',
        }),
        evaluationPeriods: 1,
        datapointsToAlarm: 1,
        threshold: Lambda.timeout.toMilliseconds(),
        treatMissingData: cdk.aws_cloudwatch.TreatMissingData.IGNORE,
        alarmName: 'Lambda Timeout',
      });
    }

    // defines an API Gateway Http API resource backed by our "PredictiveLambda" function.
    const api = new cdk.aws_apigateway.RestApi(this, 'Predictive Endpoint');
    // const api = new cdk.aws_apigateway.RestApi(this, 'Predictive Endpoint', {
    //   defaultIntegration: new cdk.aws_apigateway.LambdaIntegration(
    //   handler: Lambda.I, {
    //     proxy: false,
    //   }),
    // });

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
          // origin: new cdk.aws_cloudfront_origins.RestApiOrigin(api),
          origin: new cdk.aws_cloudfront_origins.HttpOrigin('httpApi'),
          // viewerProtocolPolicy:
          //   cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          // cachePolicy: cdk.aws_cloudfront.CachePolicy.CACHING_DISABLED,
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
