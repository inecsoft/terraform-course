resource "helm_release" "vault" {
  name             = "vault"
  repository       = "https://helm.releases.hashicorp.com"
  chart            = "vault"
  version          = "0.23.0"
  create_namespace = "true"
  namespace        = "vault"

  /* values = [
    "${file("helm-vault-raft-values.yml")}"
  ] */

  set {
    name  = "server.ha.enabled"
    value = "true"
  }

  set {
    name  = "server.ha.raft.enabled"
    value = "true"
  }


}

#helm repo add hashicorp https://helm.releases.hashicorp.com

#helm search repo hashicorp/vault

# Check status
# kubectl -n vault get po
# kubectl exec -it vault-0 -- vault status

# Initialize
# kubectl exec -it vault-0 -- vault operator init -n 1 -t 1
# kubectl -n vault exec vault-0 -- vault operator init -key-shares=1 -key-threshold=1 -format=json > cluster-keys.json

# VAULT_UNSEAL_KEY=$(cat cluster-keys.json | jq -r ".unseal_keys_b64[]")

# Unseal vault
# kubectl exec -it vault-0 -- vault operator unseal <unsealkey>
# kubectl -n vault exec vault-0 -- vault operator unseal $VAULT_UNSEAL_KEY

#Join the vault-1 pod to the Raft cluster
# kubectl -n vault exec -ti vault-1 -- vault operator raft join http://vault-0.vault-internal:8200
# kubectl -n vault exec -ti vault-2 -- vault operator raft join http://vault-0.vault-internal:8200

# Use the unseal key from above to unseal vault-1 and vault-2
# kubectl -n vault exec -ti vault-1 -- vault operator unseal $VAULT_UNSEAL_KEY
# kubectl -n vault exec -ti vault-2 -- vault operator unseal $VAULT_UNSEAL_KEY
# jq -r ".root_token" cluster-keys.json

# List all the nodes within the Vault cluster for the vault-0 pod.
# kubectl -n vault exec vault-0 -- vault operator raft list-peers

# CLUSTER_ROOT_TOKEN=$(cat cluster-keys.json | jq -r ".root_token")
# kubectl -n vault exec vault-0 -- vault login $CLUSTER_ROOT_TOKEN

# kubectl -n vault exec --stdin=true --tty=true vault-0 -- /bin/sh

#test
# kubectl -n vault exec vault-0 -- vault login $CLUSTER_ROOT_TOKEN

#CLUSTER_ROOT_TOKEN=(cat cluster-keys.json | jq -r ".root_token")
# curl --cacert $WORKDIR/vault.ca \
#   --header "X-Vault-Token: $CLUSTER_ROOT_TOKEN" \
#   https://127.0.0.1:8200/v1/secret/data/tls/apitest | jq .data.data
