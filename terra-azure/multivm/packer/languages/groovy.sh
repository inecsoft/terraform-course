#!/bin/bash -e -x

DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

echo "*** Installing Java ***"
curl -O https://cdn.azul.com/zulu/bin/zulu8.38.0.13-ca-jdk8.0.212-linux_amd64.deb
apt-get -qq -y install -o=Dpkg::Use-Pty=0 java-common libasound2 libxi6 libxrender1 libxtst6 libfontconfig1
dpkg -i zulu*.deb
rm -rf zulu*

echo "*** Checking Java installation ***"
java -version

echo "*** Installing Groovy ***"
wget --quiet --no-check-certificate https://dl.bintray.com/groovy/maven/apache-groovy-sdk-2.4.15.zip -O groovy.zip
unzip -q groovy.zip -d /usr/local/groovy
rm -rf groovy.zip
ln -s /usr/local/groovy/groovy-2.4.15/bin/groovy /usr/bin/groovy
ln -s /usr/local/groovy/groovy-2.4.15/bin/groovyc /usr/bin/groovyc
ln -s /usr/local/groovy/groovy-2.4.15/bin/grape /usr/bin/grape
ln -s /usr/local/groovy/groovy-2.4.15/bin/groovysh /usr/bin/groovysh
ln -s /usr/local/groovy/groovy-2.4.15/bin/groovydoc /usr/bin/groovydoc

echo "*** Checking Groovy installation ***"
groovy -version