resource "aws_iam_role" "s3-provider-role" {
  name               = "${var.cluster_name}_s3-provider"
  path               = "/irsa-role/"
  assume_role_policy = data.aws_iam_policy_document.s3-provider-assume.json
}

data "aws_iam_policy_document" "s3-provider-assume" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    effect  = "Allow"

    condition {
      test     = "StringEquals"
      variable = "${replace(var.identity_oidc_issuer, "https://", "")}:sub"
      values   = ["system:serviceaccount:test-irsa:s3-provider"]
    }

    principals {
      identifiers = ["arn:aws:iam::050124427385:oidc-provider/${replace(var.identity_oidc_issuer, "https://", "")}"]
      type        = "Federated"
    }
  }
 }
 
resource "aws_iam_policy" "s3-provider-policy" {
  name   = "${var.cluster_name}-s3-provider-policy"
  policy = data.aws_iam_policy_document.s3-provider-doc.json
}


data "aws_iam_policy_document" "s3-provider-doc" {
  statement {
    sid       = ""
    effect    = "Allow"
    actions = [
      "s3:*",
    ]
    resources = [
      "arn:aws:s3:::tfgms3fs:*",
      "arn:aws:s3:::tfgms3fs"
    ]
  }
}

resource "aws_iam_role_policy_attachment" "s3-provider-attach" {
  role       = aws_iam_role.s3-provider-role.name
  policy_arn = aws_iam_policy.s3-provider-policy.arn
}
resource "kubernetes_service_account" "s3-provider_sa" {
  metadata {
    name      = "s3-provider"
    namespace = "test-irsa"

    labels = {
      "app.kubernetes.io/name" = "s3-provider"
    }
    annotations = {
      "eks.amazonaws.com/role-arn" = aws_iam_role.s3-provider-role.arn
    }

    automount_service_account_token = true
  }
}

resource "kubernetes_cluster_role_binding" "s3-provider_rb" {
  metadata {
    name = "eks:podsecuritypolicy:privileged:test-irsa:s3-provider"
    labels = {
      "eks.amazonaws.com/component"   = "pod-security-policy"
      "kubernetes.io/cluster-service" = "true"
    }
    annotations = {
      "kubernetes.io/description" = "Allow test-irsa s3-provider service account to create privileged pods."
    }
  }
  subject {
    kind      = "ServiceAccount"
    name      = "s3-provider"
    namespace = "test-irsa"
  }
  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = "eks:podsecuritypolicy:privileged"
  }
}

resource "kubernetes_service_account" "test-pod_sa" {
  metadata {
    name      = "test-pod"
    namespace = "test-irsa"
  }
}

resource "kubernetes_cluster_role_binding" "test-pod_rb" {
  metadata {
    name = "eks:podsecuritypolicy:privileged:test-irsa:test-pod"
    labels = {
      "eks.amazonaws.com/component"   = "pod-security-policy"
      "kubernetes.io/cluster-service" = "true"
    }
    annotations = {
      "kubernetes.io/description" = "Allow test-irsa test-pod service account to create privileged pods."
    }
  }
  subject {
    kind      = "ServiceAccount"
    name      = "test-pod"
    namespace = "test-irsa"
  }
  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = "eks:podsecuritypolicy:privileged"
  }
}


#kubectl -n test-irsa create configmap s3-config --from-literal=S3_REGION=eu-west-1 --dry-run=server -o yaml |k2tf 
resource "kubernetes_config_map" "config_map_s3" {
  metadata {
    name = "s3-config"
    namespace = "test-irsa"
  }

  data = {
    S3_REGION = "eu-west-1"
    S3_BUCKET = "tfgms3fs"
    AWS_KEY   = ""
    AWS_SECRET_KEY = ""
  }
}

resource "kubernetes_daemonset" "daemonset-s3-provider" {
  metadata {
    name      = "s3-provider"
    namespace = "test-irsa"

    labels = {
      app = "s3-provider"
    }
  }

  spec {
    selector {
      match_labels = {
        app = "s3-provider"
      }
    }

    template {
      metadata {
        labels = {
          app = "s3-provider"
        }
      }

      spec {
        volume {
          name = "devfuse"

          host_path {
            path = "/dev/fuse"
          }
        }

        volume {
          name = "mntdatas3fs"

          host_path {
            path = "/mnt/s3data"
          }
        }
        #created image from dockerfile
        container {
          name  = "s3fuse"
          image = "meain/s3-mounter" #"050124427385.dkr.ecr.eu-west-1.amazonaws.com/s3fs:latest"

          volume_mount {
            name       = "devfuse"
            mount_path = "/dev/fuse"
          }

          volume_mount {
            name       = "mntdatas3fs"
            mount_path = "/var/s3fs:shared"
          }

          env_from {
            config_map_ref {
              name = "s3-config"
            }
          }

          security_context {
            privileged = true
          }
          
          resources {
            limits {
              memory = "50Mi"
              cpu = "10m"
            }
            requests {
              memory = "10Mi"
              cpu = "2m"
            }
          }
        }

        automount_service_account_token = "true"
        service_account_name            = kubernetes_service_account.s3-provider_sa.metadata.0.name
        node_selector                   = { "deployment_env" = "prod" }
      }
    }
  }
}

resource "kubernetes_deployment" "test_pod" {
  metadata {
    name      = "test-pod"
    namespace = "test-irsa"

    labels = {
      app = "test-pod"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "test-pod"
      }
    }

    template {
      metadata {
        labels = {
          app = "test-pod"
        }
      }

      spec {
        volume {
          name = "mntdatas3fs"

          host_path {
            path = "/mnt/s3data"
          }
        }

        container {
          name  = "s3-test-nginx"
          image = "nginx"

          volume_mount {
            name       = "mntdatas3fs"
            mount_path = "/var/s3fs:shared"
          }

          security_context {
            privileged = true
          }

          resources {
            limits {
              memory = "50Mi"
              cpu = "10m"
            }
            requests {
              memory = "50Mi"
              cpu = "10m"
            }
          }

        }
        
        automount_service_account_token = "true"
        service_account_name            = kubernetes_service_account.test-pod_sa.metadata.0.name
        node_selector                   = { "deployment_env" = "prod" }
      }

    }
  }
}