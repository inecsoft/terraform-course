### __List helm repos__
```
helm repo list
```
### __Search stable repository for a mysql chart__
```
helm search repo stable/mysql --versions
```
### __Show chart definition__	
```
helm show chart stable/mysql
```
### __pipe readme to a file__
```
helm show readme stable/mysql > /tmp/mysql-readme.txt
```
### __Show chart values__
```
helm show values stable/mysql
```
### __Test the deployment of the chart__
```
helm install mysql stable/mysql --dry-run --debug
```
### __Deployment chart__
```
helm install mysql stable/mysql --version 1.6.3
```
### __Upgrade the release__
```
helm upgrade mysql stable/mysql --version 1.6.4
```
### __Upgrade the release__
```
helm rollback mysql 1
```
### __View deployments__
```
helm list
```
### __View status of the release__
```
helm status mysql
```
### __Get release manifest__
```
helm get manifest mysql > /tmp/manifest-mysql.txt
```
### __Get release notes__
```
helm get mysql > /tmp/notes-mysql.txt
```
### __Get kubernetes objects__
```
helm get all > /tmp/all.txt
```
### __View release history__
```
helm history mysql
```
### __Uninstall the release__
```
helm uninstall mysql --keep-history
```
### __Create custom charts__
```
helm create ourchart
cd ourchart/templates
rm -rf *yaml
```
### __Create deployment__
```
kubectl create deployment nginx 
--image=nginx 
--dry-run=client 
--output=yaml > deployment.yaml

kubectl create deployment nginx 
--image=nginx
```
### __Create service__
```
kubectl expose deployment nginx 
--type=LoadBalancer 
--port=80 
--dry-run=client 
--output=yaml >> service.yaml

kubectl delete deployment nginx 
```
### __Clean up our charts__
```
rm -rf ourchart/charts ourchart/templates/tests
```
### __Install our custom charts__
```
helm install ourchart ./ourchart
```
### __Delete our custom charts__
```
helm delete ourchart
```
### __Add release name to deployment__
```
{{ .Realease.Name }}
```
### __Add in a custorm value__
```
echo 'containerImage: nginx:1.17' > /ourchart/values.yaml
```
### __Update the deployment values yaml to use the new defualt value__
```
{{ .Values.containerImage }}
```
### __View the container image in the deployment__
```
kubectl get deployment -o jsonpth='{ .items[*].spec.template.spec.containers[*].image }'
```
### __How to upgrade ourchart chart, overwrites image in the values files__
```
helm upgrade ourchart ./ourchart --set containerImage=nginx:1.18
```
### __How to package our chart__
```
helm package ./ourchart --destination /tmp/charts
```
### __Create a repo and clone repository locally__ 
```
git clone https://github.com/dbafromthecold/DemoHelmRepo.git
```
### __navigate to repo__
```
cd DemoHelmRepo
```
### __Copy packaged chart into repo__
```
cp /tmp/ourchart-0.1.0.tgz .
```
### __index repo__
```
helm repo index .
```
### __view index.yaml__
```
cat index.yaml
```


### __Push chart to Github__
```
git add .
git commit -m "added ourchart to repo"
git push
```
### __Add Githb repo as a Helm repository__
```
helm repo add dbafromthecold https://raw.githubusercontent.com/dbafromthecold/DemoHelmRepo/master
```
### __search new Helm repository__
```
helm search repo dbafromthecold/ourchart
```