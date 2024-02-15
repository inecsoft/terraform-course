resource "aws_cognito_identity_pool" "cognito_identity_pool" {
	identity_pool_name = "loungebeer"

#   lifecycle {
#     ignore_changes = [cognito_identity_providers]
#   }

	allow_unauthenticated_identities = true
	allow_classic_flow               = false
	# openid_connect_provider_arns     = [aws_iam_role.Cognito_loungebeerUnauth_Role.arn]
}

resource "aws_cognito_identity_pool_roles_attachment" "cognito_identity_pool_roles_attachment" {
  identity_pool_id = aws_cognito_identity_pool.cognito_identity_pool.id

#   role_mapping {
#     identity_provider         = "graph.facebook.com"
#     ambiguous_role_resolution = "AuthenticatedRole"
#     type                      = "Rules"

#     mapping_rule {
#       claim      = "isAdmin"
#       match_type = "Equals"
#       role_arn   = aws_iam_role.Cognito_loungebeerUnauth_Role.arn
#       value      = "paid"
#     }
#   }

  roles = {
    # "authenticated" = aws_iam_role.Cognito_loungebeerUnauth_Role.arn
	unauthenticated = aws_iam_role.cognito_loungebeerUnauth_role.arn
  }
}

# terraform import aws_cognito_identity_pool_roles_attachment.cognito_identity_pool_roles_attachment eu-west-1:b64805ad-cb56-40ba-9ffc-f5d8207e6d42

output "cognito_identity_pool_id" {
  value = aws_cognito_identity_pool.cognito_identity_pool.id
}