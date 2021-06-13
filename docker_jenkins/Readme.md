***

curl -s get.sdkman.io | bash
source "/home/inecsoft/.sdkman/bin/sdkman-init.sh
sdk version
sdk install groovy
sudo apt install openjdk-14-jre-headless
ls -log /usr/lib/jvm
echo export JAVA_HOME=/usr/lib/jvm/java-14-openjdk-amd64 >> ~/.bashrc
groovy -version

***
docker exec -it docker_jenkins_jenkins_1 bash
 /var/jenkins_home/workspace/userpipeline@script/Jenkinsfile
***
### __Where jenkins stores the scripts__
 /usr/share/jenkins/ref/init.groovy.d/executors.groovy
 ***
export groovy_version=3.0.8
wget https://groovy.jfrog.io/artifactory/dist-release-local/groovy-zips/apache-groovy-sdk-${groovy_version}.zip
unzip -d /usr/local/ apache-groovy-sdk-${groovy_version}.zip
echo "export GROOVY_HOME=/usr/local/groovy-${groovy_version}" >>~/.bashrc
echo "export PATH=$PATH:$GROOVY_HOME/bin" >>~/.bashrc

***
### __Build the image__
```
docker-compose up --build -d
```

***
git@github.com:inecsoft/Jenkins-shared-libs.git
#!/usr/bin/env groovy

@Library('Jenkins-shared-libs')_

terraformPipeline {
   environments = ['dev', 'staging', 'prod']
}
***
