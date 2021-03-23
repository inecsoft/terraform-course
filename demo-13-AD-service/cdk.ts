import ec2 = require('@aws-cdk/aws-ec2');
import directoryservice = require('@aws-cdk/aws-directoryservice');
import cdk = require('@aws-cdk/cdk');

class MyStack extends cdk.Stack {
    constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
        super(parent, name, props);

        const ec2fed5098 = new ec2.CfnSubnet(this, 'ec2fed5098', {
        });

        const ec206eed22 = new ec2.CfnSubnet(this, 'ec206eed22', {
        });

        const ds5fa721c = new directoryservice.CfnSimpleAD(this, 'ds5fa721c', {
            name: "ad.inecsoft.co.uk",
            password: "zZPrKiIN5vdWI7IqczEQaA==",
            shortName: "inecsoft",
            size: "Small",
            vpcSettings: {
                vpcId: "vpc-2b97ab4d",
                subnetIds: [
                    "subnet-012069200f50f9cfb",
                    "subnet-0bc03289c143a12b0"
                ]
            }
        });

        new cdk.Output(this, 'ec2fed5098Ref', { value: ec2fed5098.ref, disableExport: true })
        new cdk.Output(this, 'ec206eed22Ref', { value: ec206eed22.ref, disableExport: true })
        new cdk.Output(this, 'ds5fa721cRef', { value: ds5fa721c.ref, disableExport: true });
    }
}

const app = new cdk.App();

new MyStack(app, 'my-stack-name', { env: { region: 'eu-west-1' } });

app.run();