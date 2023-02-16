resource "kubernetes_deployment" "webapp" {
  metadata {
    name = "webapp"

    labels = {
      app = "webapp"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "webapp"
      }
    }

    template {
      metadata {
        labels = {
          app = "webapp"
        }
      }

      spec {
        container {
          name  = "app"
          image = "burtlo/exampleapp-ruby:k8s"

          env {
            name  = "VAULT_ADDR"
            value = "http://vault:8200"
          }

          env {
            name  = "JWT_PATH"
            value = "/var/run/secrets/kubernetes.io/serviceaccount/token"
          }

          env {
            name  = "SERVICE_PORT"
            value = "8080"
          }

          image_pull_policy = "Always"
        }

        service_account_name = "vault"
      }
    }
  }
}
