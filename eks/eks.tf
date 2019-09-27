provider "aws" {
  region = "${var.region}"
}

resource "aws_eks_cluster" "eks-cluster" {
  name            = "${var.cluster-name}"
  role_arn        = "${aws_iam_role.cluster-role.arn}"

  vpc_config {
    security_group_ids = ["${aws_security_group.eks-cluster-sg.id}"]
    subnet_ids         = ["${aws_subnet.eks-node-subnet.*.id}"]
  }

  depends_on = [
    "aws_iam_role_policy_attachment.eks-cluster-AmazonEKSClusterPolicy",
    "aws_iam_role_policy_attachment.eks-cluster-AmazonEKSServicePolicy",
  ]
}
