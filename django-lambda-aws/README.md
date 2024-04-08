### How to create python environment

```
python -m venv env
source env/bin/activate
```

```
pip install django

django-admin startproject django_aws_lambda
cd django_aws_lambda
python manage.py startapp hello

mkdir templates
mkdir static

python manage.py runserver
pip freeze >>requirements.txt
```

### How to install packages

```
pip install -r requirements.txt
```

### **Run Django project locally**

```
export DJANGO_SETTINGS_MODULE=django_aws_lambda.local
```

### **Create serverless configuration**

```
npm init
```

### **serverless configuration**

```
npm install -g serverless
```

### **Install serverless**

```
serverless create --template aws-python3
npm install -P serverless-dotenv-plugin
npm install -P serverless-prune-plugin
npm install -P serverless-python-requirements
npm install -P serverless-wsgi
```

### **Deploy your Django project to AWS Lambda using Serverless**

```
serverless deploy -s production
```

```
serverless remove -s production
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

### **REF:**

```

https://dev.to/vaddimart/deploy-django-app-on-aws-lambda-using-serverless-part-1-1i90

```

```

```
