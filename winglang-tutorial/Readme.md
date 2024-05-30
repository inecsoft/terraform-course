### **Project plan**

- we are going to use a few cloud resources: a queue, a bucket, and a function.
- The general idea is that when a message is pushed to the queue, the function gets triggered and stores it into the bucket.

![alt text](images/image.png)

### **Start a wing project**

```
wing new empty --language wing
```

wing compile - build your project
wing it - simulate your app in the Wing Console
wing test - run all tests
wing docs

Visit the docs for examples and tutorials: https://winglang.io/docs

```
wing compile -t tf-aws main.w
```

```
cd ./target/main.tfaws
export AWS_REGION=eu-west-1 # or any other region
export AWS_PROFILE=ivan-arteaga-dev
terraform init
```

### **Ref:** "gitignore.io"
