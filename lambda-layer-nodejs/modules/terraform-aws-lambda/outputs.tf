output "lambda_role" {
	description = "IAM Role id to attach more policies"
	value = aws_iam_role.lambda_role.id
}

output "archive_file_base64sha256" {
	description = "archive output sha 256"
	value = data.archive_file.main.output_base64sha256
}

output "archive_file_output_path" {
	description = "archive output path"
	value = data.archive_file.main.output_path
}
