resource "aws_accessanalyzer_analyzer" "accessanalyzer_analyzer" {
  #depends_on = [aws_organizations_organization.example]

  analyzer_name = "ConsoleAnalyzer-ivan-dev"
  type          = "ACCOUNT" # "ORGANIZATION"
}

#terraform import aws_accessanalyzer_analyzer.example example