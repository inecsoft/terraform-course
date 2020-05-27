# Currency Rate History
This project demostrate how superheroic Python modules [Zappa](https://github.com/Miserlou/Zappa) solves the common challenges in modern web applications.

- Async tasks
- Periodic background task

## Prerequisite
If you're deploying a Django application with Zappa for the first time, you might want to read Edgar Roman's [Django Zappa Guide](https://edgarroman.github.io/zappa-django-guide/).

1. A free account from [Currency Layer](https://currencylayer.com/)
2. Cloud accessible database
3. S3 bucket, for accessing static content, CSS, JS files

## Installation
### Clone this repo
```
git clone http://github.com/arnoldgithub/Currency_Rate.git
```

### __zappa tutorial__
```
python3 -m venv .venv && source .venv/bin/activate
pip install zappa zappa-django-utils django-storages awscli

zappa init
zappa deploy dev
zappa certify dev -y
zappa manage dev "collectstatic --noinput"
zappa manage migrate
zappa manage load_initial_data

zappa status dev

zappa update dev

zappa tail dev --disable-keep-open --since 5m
zappa invoke dev "print(os.environ)" --raw
zappa undeploy dev

```

### Install required Python modules
```
cd Currency_Rate
pip3 install -r requirements.txt
```

## Configurations
There are several values that you have to change before you can run this demo code
1. Replace the values of database inside Currency_Rate/settings.py with your database values
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': '<your_db_name>',
        'USER': '<your_db_user>',
        'PASSWORD': '<your_db_password>',
        'HOST': '<your_db_host>',
        'PORT': '5432',
    }
}
```

2. In Currency_Rate/settings.py, replace <your_api_layer_access_key> with your Currency Layer API access key
```
API_LAYER_ACCESS_KEY = '<your_api_layer_access_key>'
```

3. In zappa_settings.json, replace values in SecurityGroupIds, SubnetIds with your values.
```
"vpc_config" : {
    "SubnetIds": [ "<your_subnet_1>", "<your_subnet_2" ], // use the private subnet
    "SecurityGroupIds": [ "your_sg" ]
},
```

## First deployment
```
zappa deploy
```

### After the first deployment, you have to add a new host to your ALLOWED_HOSTS, type
```
zappa status
```
to check the new host in the API Gateway URL section of the result.

Add that value to your ALLOWED_HOSTS, remember to add the host only, but not the whole value.

### Update the deployed code
```
zappa update
```

__Test the function__
```
aws lambda invoke --function-name rsd_function_nodejs output.txt
```
