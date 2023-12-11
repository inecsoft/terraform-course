FROM public.ecr.aws/lambda/python:3.12
COPY ./deployment/app.py ./deployment/requirements.txt  ./
RUN pip3 install -r requirements.txt
# env DYNAMODB_TABLE=Movies
CMD ["app.lambdaHandler"]