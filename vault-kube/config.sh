#!/bin/bash

kubectl -n vault get po
kubectl exec -it vault-0 -- vault status

echo # Initialize
# kubectl exec -it vault-0 -- vault operator init -n 1 -t 1
kubectl -n vault exec vault-0 -- vault operator init -key-shares=1 -key-threshold=1 -format=json > cluster-keys.json

VAULT_UNSEAL_KEY=$(cat cluster-keys.json | jq -r ".unseal_keys_b64[]")

echo # Unseal vault
# kubectl exec -it vault-0 -- vault operator unseal <unsealkey>
kubectl -n vault exec vault-0 -- vault operator unseal $VAULT_UNSEAL_KEY

echo # Join the vault-1 pod to the Raft cluster
kubectl -n vault exec -ti vault-1 -- vault operator raft join http://vault-0.vault-internal:8200
kubectl -n vault exec -ti vault-2 -- vault operator raft join http://vault-0.vault-internal:8200

echo # Use the unseal key from above to unseal vault-1 and vault-2
kubectl -n vault exec -ti vault-1 -- vault operator unseal $VAULT_UNSEAL_KEY
kubectl -n vault exec -ti vault-2 -- vault operator unseal $VAULT_UNSEAL_KEY
# jq -r ".root_token" cluster-keys.json

echo # List all the nodes within the Vault cluster for the vault-0 pod.
kubectl -n vault exec vault-0 -- vault operator raft list-peers

echo # Login with the root token on the vault-0 pod.
CLUSTER_ROOT_TOKEN=$(cat cluster-keys.json | jq -r ".root_token")
kubectl -n vault exec vault-0 -- vault login $CLUSTER_ROOT_TOKEN

echo # Enable the Kubernetes authentication method.
kubectl -n vault exec vault-0 --vault auth enable kubernetes

echo # Configure the Kubernetes authentication method to use the location of the Kubernetes API.
kubectl -n vault exec vault-0 -- vault write auth/kubernetes/config \
    kubernetes_host="https://$KUBERNETES_PORT_443_TCP_ADDR:443"

echo # Write out the policy named webapp that enables the read capability for secrets at path secret/data/webapp/config
kubectl -n vault exec vault-0 -- vault policy write webapp - <<EOF
path "secret/data/webapp/config" {
  capabilities = ["read"]
}
EOF

echo # Create a Kubernetes authentication role, named webapp, that connects the Kubernetes service account name and webapp policy.   
kubectl -n vault exec vault-0 -- vault write auth/kubernetes/role/webapp \
        bound_service_account_names=vault \
        bound_service_account_namespaces=vault \
        policies=webapp \
        ttl=24h 

# kubectl -n vault exec --stdin=true --tty=true vault-0 -- /bin/sh

#test
# kubectl -n vault exec vault-0 -- vault login $CLUSTER_ROOT_TOKEN
kubectl -n vault port-forward \
    $(kubectl -n vault get pod -l app=webapp -o jsonpath="{.items[0].metadata.name}") \
    8080:8080


curl http://localhost:8080