#!/bin/bash -e -x

DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

echo "*** Installing kubectl ***"
apt-get -y -qq install -o=Dpkg::Use-Pty=0 bridge-utils
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x ./kubectl
mv ./kubectl /usr/local/bin/kubectl

echo "*** Checking kubectl installation ***"
kubectl version --client

echo "*** Installing minikube ***"
curl -Lo minikube https://github.com/kubernetes/minikube/releases/download/v1.18.1/minikube-linux-amd64
chmod +x minikube
mv minikube /usr/local/bin/

echo "*** Checking minicube installation ***"
minikube version

echo "*** Installing helm ***"
curl -LO https://get.helm.sh/helm-v3.5.3-linux-amd64.tar.gz
tar -xvzf helm-v3.5.3-linux-amd64.tar.gz
cp ./linux-amd64/helm /usr/local/bin
cp ./linux-amd64/tiller /usr/local/bin
rm -rf ./linux-amd64

echo "*** Checking helm installation ***"
helm version --client