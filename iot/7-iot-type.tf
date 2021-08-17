#--------------------------------------------------------------------------------------
# sleep 300; terraform destroy -target aws_iot_thing_type.iot-type -force
#--------------------------------------------------------------------------------------
resource "aws_iot_thing_type" "iot-type" {
  name = "${local.default_name}_pi"

  deprecated = false

  properties {
    description           = "iot project with raspberry pi in AWS"
    searchable_attributes = []
  }
}
#--------------------------------------------------------------------------------------