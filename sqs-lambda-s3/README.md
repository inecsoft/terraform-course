 <div align="center">
    <img src="images/sqs-lambda-s3.jpg" width="700" />
</div>

# iac-intro

This project provides the demo code for the introduction to iac

# Requirements

- Go 1.20
- Terraform 1.4.6

# Project structure

The source code for this project lives in `src` which contains the go code
for the lambda. All infrastructure work should be in the `infrastructure`
directory

### **How to build go app**

```
cd src
sudo make build
sudo chown -R iarteaga. ../bin/
```

### **Test**

```
aws sqs send-message \
--region eu-west-1 \
--queue-url https://sqs.eu-west-1.amazonaws.com/911328334795/tfgm-iac-code-queue \
--message-body "hello, ivan pedro"\
--profile ivan-arteaga-dev
```

```
aws s3 ls tfgm-iac-code-vaguely-strongly-closing-chicken/
aws s3 cp s3://tfgm-iac-code-vaguely-strongly-closing-chicken/b617509b-c18e-4254-adf1-d0c8050072a3 .  --profile ivan-arteaga-dev
cat ./b617509b-c18e-4254-adf1-d0c8050072a3
```
