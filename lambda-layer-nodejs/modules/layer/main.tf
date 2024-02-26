resource "aws_lambda_layer_version" "main" {
	layer_name       = var.lambda_layer_name
	description      = var.description
	s3_bucket        = var.s3_bucket_id
	s3_key           = var.key_s3_bucket
	source_code_hash = data.archive_file.main.output_base64sha256


	compatible_runtimes = [ var.runtime ]

	depends_on = [
		aws_s3_bucket_object.main,
	]
}

resource "aws_s3_bucket_object" "main" {
	bucket = var.s3_bucket_id
	key    = var.key_s3_bucket
	source = data.archive_file.main.output_path
	etag   = data.archive_file.main.output_base64sha256

	content_type = "application/zip"
	depends_on = [
		"${path.module}".data.archive_file.main,
		null_resource.main,
	]
}

resource "null_resource" "main" {
	triggers = {
		updated_at = timestamp()
	}

	provisioner "local-exec" {
		command = <<EOF
		yarn config set no-progress
		yarn
		mkdir -p nodejs
		cp -r node_modules nodejs/
		rm -r node_modules
		EOF

		working_dir = "${path.module}/${var.code_location}"
	}
}