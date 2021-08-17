resource "aws_cognito_user_pool" "user-pool" {
  name = "inecsoft"
  alias_attributes = [
    "email",
  ]
  auto_verified_attributes = [
    "email",
  ]
  email_verification_message = "Your verification code is {####}. "
  email_verification_subject = "Your verification code"
  mfa_configuration          = "OPTIONAL"
  sms_authentication_message = "Your authentication code is {####}. "
  sms_verification_message   = "Your verification code is {####}. "
  tags                       = {}

  admin_create_user_config {
    allow_admin_create_user_only = true
    unused_account_validity_days = 7

    invite_message_template {
      email_message = "Your username is {username} and temporary password is {####}. "
      email_subject = "Your temporary password"
      sms_message   = "Your username is {username} and temporary password is {####}. "
    }
  }

  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }

  password_policy {
    minimum_length    = 10
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "email"
    required                 = true

    string_attribute_constraints {
      max_length = "2048"
      min_length = "0"
    }
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "given_name"
    required                 = true

    string_attribute_constraints {
      max_length = "2048"
      min_length = "0"
    }
  }

  sms_configuration {
    external_id    = "03a4b612-bb98-4bac-ba1c-63faa964a714"
    sns_caller_arn = aws_iam_role.inecsoft-SMS-Role.arn
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    #        email_message        = "Your verification code is {####}. "
    #        email_subject        = "Your verification code"
    #        sms_message          = "Your verification code is {####}. "
  }


}


