
***

<div align="center">
   <img src="images/devops.JPG" width="700" />
   <H1>Lambda & Zappa Project</H1>
</div>

***
### __1. Setup Virtualenv with Requirements__

```
sudo dnf module -y install python38
sudo alternatives --config python
mkdir code
cd code
python -m pip install pipenv --user
```

### __2. Activate virtual environment__
```
pipenv install zappa django django-rest-framework awscli tree
pipenv shell
```

```
python3 -m venv venv
```
```
source venv/bin/activate
```
```
python3 --version
```
```
pip install zappa django django-rest-framework awscli pipenv tree 
```

*__Note:__*  pipenv handles security and pip and venv in one tool "pipenv shell".

### __3. Start Django project__
```
django-admin startproject inecsoft .
```

```
(code) [devop@devop code]$ tree
.
├── inecsoft
│   ├── asgi.py
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
├── Pipfile
└── Pipfile.lock
```
### __ADD AWS credentials__
```
aws configure --profile zappa
```
### __5. Start Zappa__
``` 
zappa init
```

### __6. Update zappa_settings.json to our specific project__
```
{
    "dev": {
        "aws_region": "eu-west-1",
        "django_settings": "inecsoft.inecsoft.settings",
        "profile_name": "default",
        "project_name": "code",
        "runtime": "python3.6",
        "s3_bucket": "zappa-jeny9pkpr"
    }
}
```
```
{
    "dev": {
        "aws_region": "us-west-2",
        "django_settings": "zapdj.settings",
        "profile_name": "default",
        "project_name": "zappacfe",
        "runtime": "python3.6",
        "s3_bucket": "default-serverless-bucket-zappa",
        "timeout_seconds": 900,
        "manage_roles": false,
        "role_name": "default-serverless-role-zappa",
        "role_arn": "arn:aws:iam::908424941159:role/default-serverless-role-zappa"
    }
}
```
### __7. Deploy your Zappa Project__
```
zappa deploy dev
```
__note:__ A GET request to '/' yielded a 500 response code.

### __8. Update Allowed Hosts__
```
zappa status dev
```
```
zappa update dev
```
```
zappa tail
```
```
vim  settings.py
ALLOWED_HOSTS = ['127.0.0.1','kpz9f0xkpj.execute-api.eu-west-1.amazonaws.com']
```

```
zappa update dev
```
### __9. RDS Database for Serverless Django__

```
pip install psycopg2
```
or 
```
pip psycopg2-binary
```
vim settings.py
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'zapdjangodb',
        'USER': 'zapdjangouser',
        'PASSWORD': '15422715-547f-4eec-93b5-faa4f90e1d48',
        'HOST': 'zapdjangodb.cfak8zfgryqc.us-west-2.rds.amazonaws.com',
        'PORT': 5432,
    }
}
```
### __10. Zappa Django Utils__
```
pip install zappa-django-utils
```
``` 
vim settings.py
#Add to apps
INSTALLED_APPS += ['zappa_django_utils']
```
### __Update zappa_settings.json__
```
{
    "dev": {
        "aws_region": "eu-west-1",
        "django_settings": "inecsoft.inecsoft.settings",
        "profile_name": "zappa",
        "project_name": "code",
        "runtime": "python3.6",
        "s3_bucket": "default-serverless-bucket-zappa",
        "timeout_seconds": 900,
        "manage_roles": false,
        "role_name": "default-serverless-role-zappa",
        "role_arn": "arn:aws:iam::895352585421:role/default-serverless-role-zappa",
        "vpc_config" : {
            "SubnetIds": [ "subnet-08f5d1aea02062a75", "subnet-0cca9cbc53ca80e56",  "subnet-054c0dff904b4f033"],
            "SecurityGroupIds": [ "sg-zzzzzzzz" ]
        },
        "environment_variables": {
            "DATABASE_URL": "psql://user:pass@rbd_url:5432/db_names"
        }
        
    }
}
```
```
zappa update dev
```
### __14. Create DB__
```
zappa manage dev create_pg_db
```
### __15. Migrations & Migrate__
```
python manage.py makemigrations
zappa update dev
zappa manage dev migrate
```
### __16. Create Super User__
```
zappa manage dev create_admin_user
```
### __17. Create certificate__
```
zappa certify --yes
```

### __Destroy the deployment__
```
zappa undeploy dev
```
### __Updating Code & Environment__
```
zappa update dev
```
### __Roll back deploy Project__
```
zappa undeploy dev
```
### __Troubleshoot tail__
```
zappa tail dev
```
***

Ref: https://www.codingforentrepreneurs.com/blog/aws-iam-user-role-policies-zappa-serverless-python
***