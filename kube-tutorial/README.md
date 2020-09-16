***

<div align="center">
  <img src="images/kubernetes_architecture.JPG" width="700" />
</div>

***

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
### __Display information about your ReplicaSet objects:__

```
kubectl get replicasets
```
```
kubectl describe replicasets
```
# __6. Display detailed information about the Service:__
### __Debugging Pods__
```
kubectl describe pods ${POD_NAME}
```

# __Debugging Services__

```
kubectl describe service my-service
```

<div align="center">
   <img src="images/pods.JPG" width="700" />
</div>

__Endpoints:__ Which shows us the IPs of the pods available to answer service requests.

```
kubectl get endpoints ${SERVICE_NAME}
```
# __Debugging Replication Controllers__

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

# __7. In the preceding output, you can see that the service has several endpoints: 10.244.0.5:80,10.244.0.6:80. These are internal addresses of the pods that are running the test-nginx application. To verify these are pod addresses, enter this command:__

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