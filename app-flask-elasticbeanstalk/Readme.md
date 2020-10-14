***

# __Elastic beanstalk with docker and python flask app__

***

```
docker build -t eb .
docker run -d --name eb -p 5000:5000 eb
```

### __Inicialise the project__
```
eb init -p docker flask-app
```

### __Run app locally__
```
eb local run --port 5000
```

### __Open env on a browser__
```
eb local open
```

### __Deploy container on__
```
eb create flask-app -i INSTANCE_TYPE -r eu-west-1  --profile PROFILE default

### __Destroy env__
```
eb terminate flask-app
```

***