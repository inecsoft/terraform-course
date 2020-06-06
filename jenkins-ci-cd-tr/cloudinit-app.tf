#----------------------------------------------------------------------
#data "template_file" "app-init" {
#  template = file("scripts/app-init.sh")
#  vars = {
#    DEVICE          = var.INSTANCE_DEVICE_NAME
#    JENKINS_VERSION = var.JENKINS_VERSION
#  }
#}
#----------------------------------------------------------------------
data "template_cloudinit_config" "cloudinit-app" {
  gzip          = false
  base64_encode = false

#  part {
#    content_type = "text/x-shellscript"
#    content      = data.template_file.app-init.rendered
#  }
 
  part {
    content_type = "text/x-shellscript"
    content      = data.template_file.codedeploy.rendered
  }

#  part {
#    filename     = "app-cloudinit.tpl"
#    content_type = "text/cloud-config"
#    #content      = data.template_file.cmrs-nginx.rendered
#    content      =  file("scripts/app-cloudinit.tpl")
#  }

}
#----------------------------------------------------------------------

