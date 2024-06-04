### **1. Create a pod specification file for a simple application:**

```
kubectl create -f app.yaml
```

The pod simply outputs messages to a log file every two seconds. This is simulating a legacy application that does not write log messages to standard output, which is where kubectl logs expects messages to be.

### **2. View the logs seen by kubectl:**

```
kubectl logs legacy loop
```

There is no output. This is because the application is not writing to standard output, so no logs are recorded.

### **3. Use the copy command to retrieve the log file from in the container:**

```
kubectl cp legacy:/logs logs
```

The syntax specifies the source first and the destination second. The path that begins with a pod name is the path in the container. The cp command can copy files and directories to and from the host and container.

```
more logs
```

### **4. Create another pod specification for a pod that will consume a lot of CPU resources:**

```
kubectl create -f load.yaml
```

### **5. List and watch the resource consumption of pods:**

```
watch kubectl top pods
```

### **6. Create a similar pod specification except with a CPU resource limit and request for half of a CPU:**

```
kubectl create -f load-limited.yaml
watch kubectl top pods
```

Using requests and limits for CPU and memory can prevent performance issues, and allow the scheduler to make the best use of the cluster's resources.
