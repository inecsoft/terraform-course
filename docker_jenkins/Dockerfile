FROM jenkinsci/blueocean:latest AS base
ARG groovy_version=3.0.8
ARG go_version=1.16.5
ARG apache_maven_version=3.8.1
# Plugins for better UX (not mandatory)
RUN /usr/local/bin/install-plugins.sh matrix-auth ansicolor greenballs build-pipeline-plugin git-parameter workflow-basic-steps pipeline-model-definition pipeline-stage-view
# Plugins for pipelines and connectors
RUN /usr/local/bin/install-plugins.sh build-timeout build-pipeline-plugin simple-theme-plugin job-dsl docker-plugin slack timestamper ws-cleanup Office-365-Connector 
# AWS plugins
RUN /usr/local/bin/install-plugins.sh aws-codepipeline aws-global-configuration aws-lambda amazon-ecs
# Pluhins for automation tools and K8S
RUN /usr/local/bin/install-plugins.sh kubernetes groovy golang credentials aws-credentials configuration-as-code configuration-as-code-groovy hashicorp-vault-plugin
#Jenkins OS level package dependancies
USER root
RUN apk update
RUN apk add jq groff zip
#RUN curl -s get.sdkman.io | bash
#RUN source "/root/.sdkman/bin/sdkman-init.sh"
#RUN sdk install groovy
#install aws cli and cleanup
RUN cd /tmp 
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install
RUN rm -rf aws awscliv2.zip
WORKDIR /tmp/
RUN wget https://groovy.jfrog.io/artifactory/dist-release-local/groovy-zips/apache-groovy-sdk-${groovy_version}.zip
RUN unzip -d /usr/local/ apache-groovy-sdk-${groovy_version}.zip
ENV GROOVY_HOME /usr/local/groovy-${groovy_version}
ENV PATH $PATH:$GROOVY_HOME/bin/
RUN rm -rf apache-groovy-sdk-${groovy_version}.zip

#go installation
RUN wget https://golang.org/dl/go${go_version}.linux-amd64.tar.gz
RUN rm -rf /usr/local/go && tar -C /usr/local -xzf go${go_version}.linux-amd64.tar.gz
ENV GO_HOME /usr/local/go/bin
ENV PATH $PATH:$GO_HOME
RUN rm -rf go${go_version}.linux-amd64.tar.gz

#maven installation
RUN wget https://www.mirrorservice.org/sites/ftp.apache.org/maven/maven-3/${apache_maven_version}/binaries/apache-maven-${apache_maven_version}-bin.tar.gz
RUN rm -rf /usr/local/apache-maven-${apache_maven_version} && tar -C /usr/local -xzf apache-maven-${apache_maven_version}-bin.tar.gz
ENV MAVEN_HOME /usr/local/apache-maven-${apache_maven_version}/bin
ENV PATH $PATH:$MAVEN_HOME
RUN rm -rf apache-maven-${apache_maven_version}-bin.tar.gz

FROM base
WORKDIR /var/jenkins_home
COPY jenkins.yaml /var/jenkins_home/
#COPY xmlConfigs/*.xml /var/jenkins_home/
RUN mkdir /tmp/scripts
RUN mkdir /tmp/secrets
# COPY groovyScripts/* /tmp/scripts/
# COPY secrets/kubeconfig /tmp/secrets/kubeconfig
# COPY secrets/vault.properties /var/jenkins_home/vault.properties
RUN mkdir /var/jenkins_home/init.groovy.d
COPY scripts/* /var/jenkins_home/init.groovy.d/
#Configure VAULT for variable and secret resolution
# ENV CASC_VAULT_FILE=/var/jenkins_home/vault.properties
#Prepare for jenkins user to take over
RUN chown -R jenkins:jenkins /var/jenkins_home/
USER jenkins
ENV JENKINS_OPTS -Djenkins.install.runSetupWizard=false,-Dio.jenkins.plugins.casc.ConfigurationAsCode.initialDelay=10000,--httpPort=8080
WORKDIR /var/jenkins_home
VOLUME /var/jenkins_home
