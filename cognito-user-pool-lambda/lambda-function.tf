resource "aws_lambda_function" "main" {
  filename      = "lambda_function.zip"
  function_name = "terraform-example"
  role          = "${aws_iam_role.main.arn}"
  handler       = "exports.example"
  runtime       = "nodejs12.x"
}

