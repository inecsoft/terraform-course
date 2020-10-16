# Node.js Microservices Deployed on EC2 Container Service

This is a reference architecture that shows the evolution of a Node.js application from a monolithic
application that is deployed directly onto instances with no containerization or orchestration, to a
containerized microservices architecture orchestrated using Amazon EC2 Container Service.

- [Part One: The base Node.js application](1-no-container/)
- [Part Two: Moving the application to a container deployed using ECS](2-containerized/)
- [Part Three: Breaking the monolith apart into microservices on ECS](3-microservices/)

```
cd 2-containerized/services/api
docker build -t api .
sudo firewall-cmd --permanent --add-port 3000/tcp
sudo firewall-cmd --reload
docker run -d --name api -p 3000:3000  api
curl localhost:3000/api/users
docker tag api:latest 895352585421.dkr.ecr.eu-west-1.amazonaws.com/default-containers-ecr:latest
`aws ecr get-login --no-include-email `
docker push 895352585421.dkr.ecr.eu-west-1.amazonaws.com/default-containers-ecr:latest
```

aws cloudformation deploy \
--template-file infrastructure/ecs.yml \
--region eu-west-1 \
--stack-name inecsoft \
--capabilities CAPABILITY_NAMED_IAM

aws cloudformation delete-stack --stack-name inecsoft