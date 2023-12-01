FROM public.ecr.aws/lambda/python:3.9
COPY deployment/app.py requirements.txt  ./
RUN pip3 install -r requirements.txt
CMD ["app.lambdaHandler"]