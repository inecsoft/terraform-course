# Security Hub generates separate findings for a control check when the check applies to multiple enabled standards.
# For accounts that are part of an organization, this value can only be updated in the administrator account.
resource "aws_securityhub_account" "securityhub_account" {
  control_finding_generator = "STANDARD_CONTROL"

}

# The guidance to security controls across multiple frameworks:
# (including National Institute of Standards and Technology (NIST),
# Payment Card Industry Security Standards Council (PCI),
# and International Organization for Standardization (ISO)).
# AWS Foundational Security Best Practices
resource "aws_securityhub_standards_subscription" "securityhub_standards_subscription_aws_foundational" {
  depends_on    = [aws_securityhub_account.securityhub_account]
  standards_arn = "arn:aws:securityhub:${var.AWS_REGION}::standards/aws-foundational-security-best-practices/v/1.0.0"
}

# AWS Resource Tagging Standard
resource "aws_securityhub_standards_subscription" "securityhub_standards_subscription_resource_tagging_rev_1_0_0" {
  depends_on    = [aws_securityhub_account.securityhub_account]
  standards_arn = "arn:aws:securityhub:${var.AWS_REGION}::standards/aws-resource-tagging-standard/v/1.0.0"
  # arn:${var.partition}:securityhub:${var.region}::standards/aws-resource-tagging-standard/v/1.0.0
}

# CIS AWS Foundations Benchmark v1.2.0
# The Center for Internet Security (CIS) AWS Foundations Benchmark v3.0.0 is a set of security configuration best practices for AWS.
# This Security Hub standard automatically checks for your compliance readiness against a subset of CIS requirements
resource "aws_securityhub_standards_subscription" "securityhub_standards_subscription_cis_rev_1_2_0" {
  depends_on    = [aws_securityhub_account.securityhub_account]
  standards_arn = "arn:aws:securityhub:::ruleset/cis-aws-foundations-benchmark/v/1.2.0"
}

# CIS AWS Foundations Benchmark v1.4.0
resource "aws_securityhub_standards_subscription" "securityhub_standards_subscription_cis_rev_1_4_0" {
  depends_on    = [aws_securityhub_account.securityhub_account]
  standards_arn = "arn:aws:securityhub:${var.AWS_REGION}::standards/cis-aws-foundations-benchmark/v/1.4.0"
}

# CIS AWS Foundations Benchmark v3.0.0
resource "aws_securityhub_standards_subscription" "securityhub_standards_subscription_cis_rev_3_0_0" {
  depends_on    = [aws_securityhub_account.securityhub_account]
  standards_arn = "arn:aws:securityhub:${var.AWS_REGION}::standards/cis-aws-foundations-benchmark/v/3.0.0"
}

# NIST SP 800-53 Rev. 5
resource "aws_securityhub_standards_subscription" "securityhub_standards_subscription_nist_800_53_rev_5" {
  depends_on    = [aws_securityhub_account.securityhub_account]
  standards_arn = "arn:aws:securityhub:${var.AWS_REGION}::standards/nist-800-53/v/5.0.0"
}

# PCI DSS
resource "aws_securityhub_standards_subscription" "securityhub_standards_subscription_pci_dss" {
  depends_on    = [aws_securityhub_account.securityhub_account]
  standards_arn = "arn:aws:securityhub:${var.AWS_REGION}::standards/pci-dss/v/3.2.1"
}
