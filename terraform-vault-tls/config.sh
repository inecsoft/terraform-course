#!/bin/bash

mkdir /tmp/vault
echo -e \\n
echo "Export the working directory location and the naming variables."
echo -e \\n
export VAULT_K8S_NAMESPACE="vault" \
export VAULT_HELM_RELEASE_NAME="vault" \
export VAULT_SERVICE_NAME="vault-internal" \
export K8S_CLUSTER_NAME="cluster.local" \
export WORKDIR=/tmp/vault
#mkdir vault
#export WORKDIR=vault

openssl genrsa -out ${WORKDIR}/vault.key 2048
echo -e \\n
echo "Create the Certificate Signing Request (CSR)."
echo -e \\n
cat > ${WORKDIR}/vault-csr.conf <<EOF
[req]
default_bits = 2048
prompt = no
encrypt_key = yes
default_md = sha256
distinguished_name = kubelet_serving
req_extensions = v3_req
[ kubelet_serving ]
O = system:nodes
CN = system:node:*.${VAULT_K8S_NAMESPACE}.svc.${K8S_CLUSTER_NAME}
[ v3_req ]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth, clientAuth
subjectAltName = @alt_names
[alt_names]
DNS.1 = *.${VAULT_SERVICE_NAME}
DNS.2 = *.${VAULT_SERVICE_NAME}.${VAULT_K8S_NAMESPACE}.svc.${K8S_CLUSTER_NAME}
DNS.3 = *.${VAULT_K8S_NAMESPACE}
IP.1 = 127.0.0.1
EOF
echo -e \\n
echo "Generate the CSR"
openssl req -new -key ${WORKDIR}/vault.key -out ${WORKDIR}/vault.csr -config ${WORKDIR}/vault-csr.conf
echo -e \\n
echo "Create the csr yaml file to send it to Kubernetes."
cat > ${WORKDIR}/csr.yaml <<EOF
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
   name: vault.svc
spec:
   signerName: kubernetes.io/kubelet-serving
   expirationSeconds: 8640000
   request: $(cat ${WORKDIR}/vault.csr|base64|tr -d '\n')
   usages:
   - digital signature
   - key encipherment
   - server auth
EOF
echo -e \\n
echo "Send the CSR to Kubernetes"
kubectl create -f ${WORKDIR}/csr.yaml
echo "Approve the CSR in Kubernetes."
echo -e \\n
kubectl certificate approve vault.svc

kubectl get csr vault.svc -o jsonpath='{.status.certificate}' | openssl base64 -d -A -out ${WORKDIR}/vault.crt

echo "Retrieve Kubernetes CA certificate"
kubectl config view \
--raw \
--minify \
--flatten \
-o jsonpath='{.clusters[].cluster.certificate-authority-data}' \
| base64 -d > ${WORKDIR}/vault.ca

kubectl create namespace $VAULT_K8S_NAMESPACE
echo "Create the TLS secret"
kubectl create secret generic vault-ha-tls \
   -n $VAULT_K8S_NAMESPACE \
   --from-file=vault.key=${WORKDIR}/vault.key \
   --from-file=vault.crt=${WORKDIR}/vault.crt \
   --from-file=vault.ca=${WORKDIR}/vault.ca

echo "Create the overrides.yaml file."
cat > ${WORKDIR}/overrides.yaml <<EOF
global:
   enabled: true
   tlsDisable: false
injector:
   enabled: true
server:
   extraEnvironmentVars:
      VAULT_CACERT: /vault/userconfig/vault-ha-tls/vault.ca
      VAULT_TLSCERT: /vault/userconfig/vault-ha-tls/vault.crt
      VAULT_TLSKEY: /vault/userconfig/vault-ha-tls/vault.key
   volumes:
      - name: userconfig-vault-ha-tls
        secret:
         defaultMode: 420
         secretName: vault-ha-tls
   volumeMounts:
      - mountPath: /vault/userconfig/vault-ha-tls
        name: userconfig-vault-ha-tls
        readOnly: true
   standalone:
      enabled: false
   affinity: ""
   ha:
      enabled: true
      replicas: 3
      raft:
         enabled: true
         setNodeId: true
         config: |
            ui = true
            listener "tcp" {
               tls_disable = 0
               address = "[::]:8200"
               cluster_address = "[::]:8201"
               tls_cert_file = "/vault/userconfig/vault-ha-tls/vault.crt"
               tls_key_file  = "/vault/userconfig/vault-ha-tls/vault.key"
               tls_client_ca_file = "/vault/userconfig/vault-ha-tls/vault.ca"
            }
            storage "raft" {
               path = "/vault/data"
            }
            disable_mlock = true
            service_registration "kubernetes" {}
EOF

cp ${WORKDIR}/overrides.yaml .

terraform init; terraform plan; terraform apply -autoapprove
#clean
#kubectl -n vault delete secrets vault-ha-tls 
#kubectl -n vault  delete  CertificateSigningRequest vault.svc
#kubectl delete namespace $VAULT_K8S_NAMESPACE
#rm -rf /tmp/vault

#
echo "Display the pods in the namespace that you created for vault"
echo -e \\n

kubectl -n $VAULT_K8S_NAMESPACE get pods

kubectl exec -n $VAULT_K8S_NAMESPACE vault-0 -- vault operator init \
    -key-shares=1 \
    -key-threshold=1 \
    -format=json > ${WORKDIR}/cluster-keys.json

jq -r ".unseal_keys_b64[]" ${WORKDIR}/cluster-keys.json


VAULT_UNSEAL_KEY=$(jq -r ".unseal_keys_b64[]" ${WORKDIR}/cluster-keys.json)

echo "Unseal Vault running on the vault-0 pod."
kubectl exec -n $VAULT_K8S_NAMESPACE vault-0 -- vault operator unseal $VAULT_UNSEAL_KEY

echo "Join the vault-1 pod to the Raft cluster."
kubectl -n vault exec -ti vault-1 -- vault operator raft join -address=https://vault-1.vault-internal:8200 -leader-ca-cert="$(cat /vault/userconfig/vault-ha-tls/vault.ca)" -leader-client-cert="$(cat /vault/userconfig/vault-ha-tls/vault.crt)" -leader-client-key="$(cat /vault/userconfig/vault-ha-tls/vault.key)" https://vault-0.vault-internal:8200
echo -e //n
echo "Unseal vault-1."
kubectl exec -n $VAULT_K8S_NAMESPACE -ti vault-1 -- vault operator unseal $VAULT_UNSEAL_KEY
echo "Join the vault-2 pod to the Raft cluster."
kubectl -n vault exec -ti vault-2 -- vault operator raft join -address=https://vault-2.vault-internal:8200 -leader-ca-cert="$(cat /vault/userconfig/vault-ha-tls/vault.ca)" -leader-client-cert="$(cat /vault/userconfig/vault-ha-tls/vault.crt)" -leader-client-key="$(cat /vault/userconfig/vault-ha-tls/vault.key)" https://vault-0.vault-internal:8200
echo -e //n
echo "Unseal vault-2."
kubectl exec -n $VAULT_K8S_NAMESPACE -ti vault-2 -- vault operator unseal $VAULT_UNSEAL_KEY

export CLUSTER_ROOT_TOKEN=$(cat ${WORKDIR}/cluster-keys.json | jq -r ".root_token")

echo Login to vault-0 with the root token
kubectl exec -n $VAULT_K8S_NAMESPACE vault-0 -- vault login $CLUSTER_ROOT_TOKEN

echo "List the raft peers."
kubectl exec -n $VAULT_K8S_NAMESPACE vault-0 -- vault operator raft list-peers

echo "Print the HA status"
kubectl exec -n $VAULT_K8S_NAMESPACE vault-0 -- vault status

echo "Enable the kv-v2 secrets engine"
kubectl exec -n $VAULT_K8S_NAMESPACE -it vault-0 -- vault secrets enable -path=secret kv-v2

echo "Create a secret at the path secret/tls/apitest with a username and a password"
kubectl exec -n $VAULT_K8S_NAMESPACE -it vault-0 -- vault kv put secret/tls/apitest username="apiuser" password="supersecret"

echo "Verify that the secret is defined at the path secret/tls/apitest"
kubectl exec -n $VAULT_K8S_NAMESPACE -it vault-0 -- vault kv get secret/tls/apitest

kubectl -n $VAULT_K8S_NAMESPACE get service vault
echo "In another terminal, port forward the vault service."
bash kubectl -n vault port-forward service/vault 8200:8200

curl --cacert $WORKDIR/vault.ca \
   --header "X-Vault-Token: $CLUSTER_ROOT_TOKEN" \
   https://127.0.0.1:8200/v1/secret/data/tls/apitest | jq .data.data


#helm upgrade -n $VAULT_K8S_NAMESPACE $VAULT_HELM_RELEASE_NAME hashicorp/vault -f ${WORKDIR}/overrides.yaml