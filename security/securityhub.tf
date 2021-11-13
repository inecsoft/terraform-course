resource "aws_securityhub_account" "TFGMdumy" {}

resource "aws_securityhub_standards_subscription" "aws_foundational" {
  depends_on    = [aws_securityhub_account.TFGMdumy]
  standards_arn = "arn:aws:securityhub:eu-west-1::standards/aws-foundational-security-best-practices/v/1.0.0"
}

resource "aws_securityhub_standards_subscription" "cis" {
  depends_on    = [aws_securityhub_account.TFGMdumy]
  standards_arn = "arn:aws:securityhub:::ruleset/cis-aws-foundations-benchmark/v/1.2.0"
}

resource "aws_securityhub_standards_subscription" "pci_321" {
  depends_on    = [aws_securityhub_account.TFGMdumy]
  standards_arn = "arn:aws:securityhub:eu-west-1::standards/pci-dss/v/3.2.1"
}

# aws_securityhub_product_subscription
# We dont create product_subscriptions in terraform, all the default ones we use are not currently 
# configurable, just the list below :-
# arn:aws:securityhub:${var.region}::product/aws/guardduty
# arn:aws:securityhub:${var.region}::product/aws/inspector
# arn:aws:securityhub:${var.region}::product/aws/macie
# so we leave Security Hub itself to enable the basics as part of its initialisation