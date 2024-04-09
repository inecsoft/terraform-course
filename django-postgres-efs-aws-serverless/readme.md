### How to create python environment

```
python -m venv env
source env/bin/activate
```

```
pip install django

django-admin startproject django_project .
django-admin startapp todos


python manage.py makemigrations   #migrating the app and database changes
python manage.py migrate          #final migrations

python manage.py runserver
pip freeze >>requirements.txt
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
docker-compose -f ./fargate-lab/docker-compose.yml up -d
docker-compose -f ./fargate-lab/docker-compose.yml up --build
docker-compose -f ./fargate-lab/docker-compose.yml down
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

### there is some issues with the connection to the database. with local db works ok

```
psql -h production.crap8olwzhmd.eu-west-1.rds.amazonaws.com -p 5432 -U postgres -P z1n5SO08z8heRAGBcbeutIi22K0OQ9nvN6t5W

psql --host=$HOST_RDS --port=5432 --username=postgres --password --dbname=postgres
```
