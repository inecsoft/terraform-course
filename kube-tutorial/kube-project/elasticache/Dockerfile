FROM python:3.7-alpine

RUN mkdir /src
ADD main.py /src/main.py

RUN pip install redis

WORKDIR /src

EXPOSE 6379

ENTRYPOINT [ "python", "main.py" ]