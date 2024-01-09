import * as cdk from 'aws-cdk-lib';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';

export interface PipelineStackProps extends cdk.StackProps {
  name: string;
}

export class PipelineStack extends cdk.Stack {
  public readonly pipeline: pipelines.CodePipeline;

  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);

    const sourcegithubpat = pipelines.CodePipelineSource.gitHub(
      'inecsoft/terraform-course',
      'main',
      {
        // This is optional
        authentication: cdk.SecretValue.secretsManager('dev/pat'),
      }
    );

    const sourcegithubconnection = pipelines.CodePipelineSource.connection(
      'inecsoft/cdk-serverless-application',
      'oring-cdk-nextjs',
      {
        connectionArn: 'REPLACE_WITH_CONNECTION_ARN',
      }
    );

    this.pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      synth: new pipelines.ShellStep('synth', {
        input: sourcegithubpat,
        commands: [
          'npm ci',
          'cd app',
          'yarn install',
          'yarn build',
          'cd ..',
          'npx cdk synth',
        ],
      }),

      // Defaults for all CodeBuild projects
      codeBuildDefaults: {
        // Prepend commands and configuration to all projects
        partialBuildSpec: cdk.aws_codebuild.BuildSpec.fromObject({
          version: '0.2',
          phases: {
            install: {
              // Add the shell commands to install your drop-in Docker
              // replacement to the CodeBuild enviromment.
              // commands: installCommands,
              // runtime-versions:
              //   python: 3.8
              // nodejs: 18,
              'runtime-versions': { nodejs: '18' },
            },
          },

          // ...
        }),

        // Control the build environment
        buildEnvironment: {
          computeType: cdk.aws_codebuild.ComputeType.LARGE,
          buildImage: cdk.aws_codebuild.LinuxBuildImage.STANDARD_7_0,
          privileged: true,
        },
        timeout: cdk.Duration.minutes(10),
      },

      crossAccountKeys: true,
      dockerEnabledForSynth: true,
    });
  }
}
