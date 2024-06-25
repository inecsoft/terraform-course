## **Testing project**

### **how to test post method**

```
mkdir frontend backend
cd frontend
npx create-next-app ./
npm run dev

npm run build
```

### **Start a wing project**

```
cd backend
wing new empty --language wing
npm install @winglibs/react
npm i @winglibs/openai
```

wing compile - build your project
wing it - simulate your app in the Wing Console
wing test - run all tests
wing docs

Visit the docs for examples and tutorials: https://winglang.io/docs

```
wing compile -t tf-aws main.w
```

### **Compile backend with wing plugin and get custom aws provider**

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
