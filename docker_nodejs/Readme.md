docker run  -it -d -p 3000:3000 --name nodeapp nodeapp 

***
__Build__
```
docker build -t nodeapp .
```
__Run the app__
```
docker run  -it -d -p 3000:3000 --name nodeapp nodeapp
```
__Test__
```
curl localhost:3000
```
__Delete container__
```
docker rm nodeapp; docker rmi nodeapp
```
***