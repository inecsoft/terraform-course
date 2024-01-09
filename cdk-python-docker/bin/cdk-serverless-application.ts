#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { pythonLambdaCdkStack } from '../lib/lambda-from-image-python';

const app = new cdk.App();
new pythonLambdaCdkStack(app, 'CdkServerlessApplicationStack', {
  tags: { region: 'eu-west-1', project: 'pythonimage' },
});
