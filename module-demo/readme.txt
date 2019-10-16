to run this demo first:
we need a certificate you needt to created on certificate manager

2-you need to push your images to the repo
to test docker pull nginx
docker tag nginx $(ulr-repo)/my-service 
run ./ecr-login.sh
docker push $(ulr-repo)/my-service

