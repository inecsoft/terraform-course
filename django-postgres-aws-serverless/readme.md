```
python -m venv env
source env/bin/activate

pip install django

django-admin startproject django_neon
cd django_neon
django-admin startapp todos


python manage.py makemigrations   #migrating the app and database changes
python manage.py migrate          #final migrations

python manage.py runserver
pip freeze >>requirements.txt
```

```

docker build -t python-django-app .
docker run -it --name python-django-app -p 8000:8000 python-django-app

zip -r ./fargate-lab/fargatelab.zip fargate-lab
```

### How to build with docker compose

```
docker-compose -f ./fargate-lab/docker-compose.manual.yml up
docker-compose -f ./fargate-lab/docker-compose.manual.yml down
```

### How to generate the secrect

```
from django.core.management import utils
print(utils.get_random_secret_key())
```
