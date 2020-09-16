***

<div align="center">
  <img src="images/kubernetes_architecture.JPG" width="700" />
</div>

***

# __Managing pods and Containers__

### __Verify the health of the cluster:__

```
kubectl get cs
```

### __Shows all resources type:__

```
kubectl get all
```

# __What are these different things?__
  - A deployment is a high-level construct
    * Allows scaling, rolling updates, rollbacks.
    * Multiple deployments can be used together to implement a canary deployment.
    * Delegates pods management to replica sets.  
  - A replica set is a low-level construct.
    * Makes sure that a given number of identical pods are running.
    * Allows scaling.
    * Rarely used directly.
  - A replication controller is the (deprecated) predecessor of a replica set

### __Verify if nodes were created:__

```
kubectl get nodes -o=wide
```

### __Verify if pods were created:__

```
kubectl get pods -o wide --all-namespaces
```

### __verify the system namespace:__

```
kubectl -n kube-system get pods -o wide
```
### __Verify if deployments were created:__

```
kubectl get deployments -o wide --all-namespaces
```

# __Verify if services were created:__
```
kubectl get service -o wide --all-namespaces
```
Provides the manual for the command specified:__
```
kubectl explain namespaces
```
# __1. Deploys new container with replication equal 2, usingnginximage and open port 80 in the cluster:__

```
kubectl run test-nginx --image=nginx --replicas=2 --port=80
```
  * easyway to get started  
  * versatile

```
kubectl create <resource>
```
  * Explicit, but lacks some features  .
  * Can't create a CronJob.
  * Can't pass command-line arguments to deployments.

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/website/master/content/en/examples
/application/nginx-app.yaml
```
Or
```
kubectl create -f foo.yaml
```

*__Note:__* kubectl run --restart=OnFailure or kubectl run --restart=Never all features are available

# __2. Display information about the Deployment:__

```
kubectl get deployments test-nginx
```
### __View status of the rollout:__

```
kubectl rollout status deployment <deployment-name>
```
### __Set the image of a deployment or upgrade the deployment:__

```
kubectl set image deployment/<deployment-name> container-name=image-name:version
```
### __View the history of a rollout, including previous revisions:__

```
kubectl rollout history deployment/deployment-name
```
```
kubectl rollout history deployment/deployment-name --revision=<revision number>
```
```
kubectl describe deployments test-nginx
```
### __Recovering from a bad rollout__

```
kubectl rollout undo deploy test-nginx
```
# __3. Display information about your ReplicaSet objects:__

```
kubectl get replicasets
```
```
kubectl describe replicasets
```

# __4. Create a Service object that exposes the deployment to the outside world:__
```
kubectl expose <type name> <identifier/name> [--port=external port] [--target-port=container-port][--type=service-type]
``` 
```
kubectl expose deployment test-nginx --type=NodePort --name=my-service
```
```
kubectl expose deployment test-nginx --type=LoadBlancer --port=80 --targetport=80 --name=my-service-loadbalancer
```

# __Basic service types__

*__ClusterIP:__* __(default type) Exposes the service on a cluster-internal IP. Choosing this value makes the service only reachable from within the cluster. This is the default ServiceType.__
  * A virtual IP address is allocated for the service (in an internal, private range)  
  * This IP address is reachable only from within the cluster (nodes and pods)  
  * Our code can connect to the service using the original port number.

*__NodePort:__* __Exposes the service on each Node’s IP at a static port (the NodePort). A ClusterIP
service, to which the NodePort service will route, is automatically created. You’ll be able to
contact the NodePort service, from outside the cluster, by requesting <NodeIP>:<NodePort>.__

  * A port is allocated for the service (by default, in the 30000-32768 range).
  * That port is made available on all our nodes and anybody can connect to it.
  * Our code must be changed to connect to that new port number.

*__LoadBalancer:__* __Exposes the service externally using a cloud provider’s load balancer. NodePort and ClusterIP services, to which the external load balancer will route, are automatically created.__

  * An external load balancer is allocated for the service.  
  * The load balancer is configured accordingly. (e.g.: a NodePort service is created, and the load balancer sends traffic to that port).
  * Available only when the underlying infrastructure provides some "load balancer as a service" (e.g. AWS, Azure, GCE, OpenStack...)

*__ExternalName:__* __Maps the service to the contents of the externalName field (e.g. foo.bar.example.com), by returning a CNAME record with its value. No proxying of any kind is set up. This requires version 1.7 or higher of kube-dns.__  

  * The DNS entry managed by CoreDNS will just be a CNAME to a provided record  
  * No port, no IP address, no nothing else is allocated  

### __5. Display information about the Service:__

```
kubectl get services my-service
```

<div align="left">
   <img src="images/service-type.JPG" width="700" />
</div>

*__NOTE:__* If the external IP address is shown as <pending>, wait for a minute and enter the same command again.

# __6. Display detailed information about the Service:__
### __Debugging Pods__

```
kubectl describe pods ${POD_NAME}
```

### __Debugging Services__

```
kubectl describe service my-service
```

<div align="left">
   <img src="images/pods.JPG" width="700" />
</div>

__Endpoints:__ Which shows us the IPs of the pods available to answer service requests.

```
kubectl get endpoints ${SERVICE_NAME}
```
### __Debugging Replication Controllers__

```
kubectl describe rc ${CONTROLLER_NAME}
```
```
kubectl get can output JSON, YAML, or be directly formatted
```
```
kubectl get nodes -o json | jq ".items[] | {name:.metadata.name} + .status.capacity"
```
```
kubectl get no -o yaml
```

# __7. In the preceding output, you can see that the service has several endpoints: 10.244.0.5:80,10.244.0.6:80. These are internal addresses of the pods that are running the test-nginx application.__ 

### __To verify these are pod addresses, enter this command:__

```
kubectl get pods --output=wide
```
# __8. Use the external IP address (LoadBalancer Ingress) to access the test-ngnxapplication:__

*__Note:__* Obtain the IP address that was allocated for our service, programmatically:
```
IP=$(kubectl get svc my-service -o go-template --template '{{ .spec.clusterIP }}')
```
```
curl http://exteranl-ip-cluster:port
```

# __9. Show environment variable for [test-nginx] pod__

```
kubectl exec test-nginx-c8b797d7d-mzf9h env
```
### __Shell access to [test-nginx] pod__

```
kubectl exec -it test-nginx-c8b797d7d-mzf9h bash
```
### __Show logs of [test-nginx] pod__
```
kubectl logs type/name --tail 1 --follow
```
or
```
kubectl logs test-nginx-c8b797d7d-mzf9h
```
### __Scale PODS__

```
kubectl scale deployment test-nginx --replicas=3
```

### __Scale a resource specified in "test-nginx.yaml" to 3__

```
kubectl scale --replicas=3 -f test-nginx.yaml
```

- *__Auto scale a deployment "test-nginx":__*  

    _--max The upper limit for the number of pods that can be set by the autoscaler. Required._    
    _--min The lower limit for the number of pods that can be set by the autoscaler. If it's not specified or negative, the server will apply a default value._  
    _--cpu-percent The target average CPU utilization (represented as a percent of requested CPU) over all the pods. If it's not specified or negative, a default autoscaling policy will be used._  
  
```
kubectl autoscale deployment test-nginx --min=2 --max=10 --cpu-percent=90
```
### __Check status of the autoscale__

```
kubectl get hpa
```
### __Create service for existing Pods, a service is a stable address for a pod (or bunch of pods)__

```
kubectl expose deployment test-nginx --type="NodePort" --port 80
```
```
kubectl get services test-nginx
```

# __10. Cleaning up__

### __Delete service__

```
kubectl delete services my-service
```
### __To delete the Deployment, the ReplicaSet, and the Pods that are running the test-ngnix application, enter this command:__

```
kubectl delete deployment test-nginx
```
### __Delete pods and services with label name=myLabkubectldelete pods, services -l name=myLabel__

```
kubectl delete pods,services -l name=myLabel
```

### __Delete a pod using the type and name specified in pod.json__

```
kubectl delete -f ./pod.json
```
### __Delete the autoscale deployment__

```
kubectl delete horizontalpodautoscalers.autoscaling test-ngnix
```