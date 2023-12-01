#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { CdkServerlessApplicationStack } from '../lib/cdk-serverless-application-stack';

const app = new cdk.App();
new CdkServerlessApplicationStack(app, 'CdkServerlessApplicationStack');
