#terraform import  aws_storagegateway_gateway.storagegateway_gateway arn:aws:storagegateway:eu-west-1:911328334795:gateway/sgw-50629639
resource "aws_storagegateway_gateway" "storagegateway_gateway" {
  depends_on = [ aws_instance.webserver ]
  gateway_ip_address = aws_instance.webserver.public_ip
  gateway_name       = "${local.default_name}-storagegateway"
  gateway_timezone   = "GMT+1:00"
  gateway_type       = "FILE_S3"

  lifecycle {
    ignore_changes = [ gateway_ip_address ]
  }
}

/* resource "aws_storagegateway_cache" "example" {
  disk_id     = data.aws_storagegateway_local_disk.example.id
  gateway_arn = aws_storagegateway_gateway.storagegateway_gateway.arn
} */

resource "aws_storagegateway_nfs_file_share" "storagegateway_nfs_file_share" {
  file_share_name         = "${local.default_name}-storagegateway_nfs_file_share"
  client_list  = ["0.0.0.0/0"]
  gateway_arn  = aws_storagegateway_gateway.storagegateway_gateway.arn
  location_arn = aws_s3_bucket.s3-bucket-mount.arn
  role_arn     = aws_iam_role.StorageGatewayBucketAccessRole.arn
  kms_encrypted           = true
  kms_key_arn             = aws_kms_key.kms-key.arn
  object_acl              = "bucket-owner-full-control"

  nfs_file_share_defaults {
    directory_mode = "0777"
    file_mode      = "0666"
    group_id       = "65534"
    owner_id       = "65534"
  }
}

resource "aws_iam_role" "StorageGatewayBucketAccessRole" {
    name               = "${local.default_name}-StorageGatewayBucketAccessRole"
    path               = "/service-role/"
    assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "storagegateway.amazonaws.com"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "aws:SourceArn": "${aws_storagegateway_gateway.storagegateway_gateway.arn}",
          "aws:SourceAccount": "${data.aws_caller_identity.current.id}"
        }
      }
    }
  ]
}
POLICY
}

resource "aws_iam_policy" "AllowStorageGatewayAssumeBucketAccessRole" {
    name        = "${local.default_name}-AllowStorageGatewayAssumeBucketAccessRole"
    path        = "/service-role/"
    description = "Allow Storage Gateway to access: dev-ec2-storage-gateway-s3-bucket-mount"
    policy      = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetAccelerateConfiguration",
        "s3:GetBucketLocation",
        "s3:GetBucketVersioning",
        "s3:ListBucket",
        "s3:ListBucketVersions",
        "s3:ListBucketMultipartUploads"
      ],
      "Resource": "${aws_s3_bucket.s3-bucket-mount.arn}",
      "Effect": "Allow"
    },
    {
      "Action": [
        "s3:AbortMultipartUpload",
        "s3:DeleteObject",
        "s3:DeleteObjectVersion",
        "s3:GetObject",
        "s3:GetObjectAcl",
        "s3:GetObjectVersion",
        "s3:ListMultipartUploadParts",
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": "${aws_s3_bucket.s3-bucket-mount.arn}/*",
      "Effect": "Allow"
    }
  ]
}
POLICY
}

resource "aws_iam_policy_attachment" "AllowStorageGatewayAssumeBucketAccessRole-policy-attachment" {
  name       = "${local.default_name}-AllowStorageGatewayAssumeBucketAccessRole-policy-attachment"
  policy_arn = aws_iam_policy.AllowStorageGatewayAssumeBucketAccessRole.arn
  groups     = []
  users      = []
  roles      = [ aws_iam_role.StorageGatewayBucketAccessRole.name ]
}