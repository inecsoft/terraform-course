### How to create python environment

```
python -m venv env
source env/bin/activate
```

```
pip install django

django-admin startproject serverless
cd serverless
python manage.py migrate
python manage.py runserver

pip freeze >>requirements.txt

python manage.py startapp main
```

### How to install packages

```
pip install -r requirements.txt
```

### How to build and test image

```
docker build -t python-django-app .
docker run -it --name python-django-app -p 8000:8000 python-django-app
```

```
zip -r ./fargate-lab/fargatelab.zip fargate-lab
```

### How to build with docker compose

```
docker-compose -f docker-compose.yml up -d
docker-compose -f docker-compose.yml up --build
docker-compose -f docker-compose.yml down
```

### **How to test**

```
curl  http://localhost:8000/ping/
```

### How to generate the secrect

```
from django.core.management import utils
print(utils.get_random_secret_key())
```

### How to fix issues with the database volume

```
docker volume rm fargate-lab_postgres_data
```

### **How to access your database**

```
docker-compose exec db psql --username=postgres --dbname=postgres
```

```
docker exec -it fargate-lab_web_1 bash
```

### **Run Django project locally**

```
export DJANGO_SETTINGS_MODULE=django_aws_lambda.local
```

### **Creating a new project**

```

django-admin startproject projectname

```

### **Add an app to a project**

```

python3 manage.py startapp appname

```

### **Starting the server**

```

python3 manage.py runserver

```

### **Creating migrations**

```

python3 manage.py makemigrations

```

### **Migrate the database**

```

python3 manage.py migrate

```

### **Creating a Super User for the admin panel**

```

python3 manage.py createsuperuser

```

### **Collecting static files into one folder**

```

python3 manage.py collectstatic

```

```
psql --host=mypostgresql.c6c8mwvfdgv0.us-west-2.rds.amazonaws.com --port=5432 --username=awsuser --password --dbname=mypgdb
```

### **Ref:** "gitignore.io"
