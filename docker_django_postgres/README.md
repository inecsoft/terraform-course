***

### __Create Django project__
```
sudo docker-compose run web django-admin startproject project .
```
### __Change the ownership:__
```
sudo chown -R $USER:$USER .
```

### __Configure database__

* vim settings.py

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'db',
        'PORT': 5432,
    }
}
```

### __Run project__
```
docker-compose up -d
```

* vim settings.py

```
 ALLOWED_HOSTS = ['*']
```

### __Destroy the project__
```
docker-compose down
```
***
REF: https://docs.docker.com/compose/django/
***