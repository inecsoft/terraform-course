# % terraform import aws_macie2_account.macie2_account <account number>
resource "aws_macie2_account" "macie2_account" {
  finding_publishing_frequency = "FIFTEEN_MINUTES"
  status                       = "ENABLED"
}