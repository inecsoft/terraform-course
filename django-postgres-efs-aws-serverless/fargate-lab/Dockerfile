# Dockerfile

# django-admin startproject mysite
# The first instruction is what image we want to base our container on
# We Use an official Python runtime as a parent image
FROM python:3.12

# Allows docker to cache installed dependencies between builds
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Mounts the application code to the image
COPY . code
WORKDIR /code

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV POSTGRES_DB=${POSTGRES_DB}
ENV ENVIRONMENT=${ENVIRONMENT}
ENV DEBUG=${DEBUG}
ENV SECRET_KEY=${SECRET_KEY}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV POSTGRES_HOST=${POSTGRES_HOST}
ENV POSTGRES_PORT=${POSTGRES_PORT}
ENV SQL_ENGINE=${SQL_ENGINE}
ENV DJANGO_ALLOWED_HOSTS=${DJANGO_ALLOWED_HOSTS}
ENV PORT=${PORT}
ENV EFS_PATH=${EFS_PATH}

EXPOSE 8000

# runs the production server
ENTRYPOINT ["python", "manage.py"]
CMD ["runserver", "0.0.0.0:8000"]