#after terraform apply
cd sample-code-nodejs/
eb init 
#select region
#4
#select app option
unzip  php-v1.zip
#you can also upload the zip file manually
eb deploy
#the route 53 record needs to be fix to redirect to the elastic beanstalk
