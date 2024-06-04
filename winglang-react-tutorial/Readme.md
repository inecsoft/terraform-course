## **Testing project**

### **how to test post method**

![alt text](images/test-manual-post.png)

### **Start a wing project**

```
npm i @winglibs/openai @winglibs/react
wing new empty --language wing
```

wing compile - build your project
wing it - simulate your app in the Wing Console
wing test - run all tests
wing docs

```
BROWSER=none wing run
```

Visit the docs for examples and tutorials: https://winglang.io/docs

```
wing compile -t tf-aws main.w
```

### **Compile backend with wing plugin**

```
wing compile -t tf-aws --plugins=plugin.static-backend.js main.w
```

```
cd ./target/main.tfaws
export AWS_REGION=eu-west-1 # or any other region
export AWS_PROFILE=ivan-arteaga-dev
terraform init
```

### **Ref:** "gitignore.io"
