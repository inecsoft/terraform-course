eb init
#select region.
#create ssh keypair
#build local
eb local run --port 5000

docker login
~/eb-docker-flask$  docker build -t docker-username/beanstalk-flask:latest .
~/eb-docker-flask$ docker push docker-username/beanstalk-flask:latest

eb create green-app

eb terminate green-app --force
eb terminate --all
