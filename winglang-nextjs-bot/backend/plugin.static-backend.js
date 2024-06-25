// plugin.static-backend.js

exports.Platform = class TFBackend {
  postSynth(config) {
    // config.terraform.backend = {
    //   s3: {
    //     bucket: '<bucket-name>',
    //     region: '<region>',
    //     key: 'path/to/my/key/terraform.tfstate',
    //     dynamodb_table: '<table-name>',
    //   },
    // };
    config.terraform.backend = {
      required_providers: {
        aws: {
          source: 'hashicorp/aws',
          version: '~> 5.0',
        },
      },
    };
    config.provider = {
      aws: {
        region: 'eu-west-1',
        profile: 'ivan-arteaga-dev',
        // shared_credentials_file: '~/.aws/credentials',
        // s3_force_path_style: true,
        // skip_credentials_validation: true,
        // skip_get_ec2_platforms: true,
      },
    };
    return config;
  }
};
