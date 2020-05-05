***
# __Getting started with docker in Azure__

***

### __Login to your container registry__  
```
docker login inesoftnodejsapp.azurecr.io  
```

### __Push to your registry__
```
docker tag hello-world inesoftnodejsapp.azurecr.io/hello-world
docker push inesoftnodejsapp.azurecr.io/hello-world
```

### __Pull from your registry__
```
docker pull inesoftnodejsapp.azurecr.io/hello-world  
```
***