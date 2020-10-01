#-----------------------------------------------------------------------------------------------------

data "template_file" "userdata" {
   template = "${file("scripts/userdata.sh")}"
   vars = {
       DEVICE = "${var.INSTANCE_DEVICE_NAME}"
       EXT_DEVICE = "${var.EXT_INSTANCE_DEVICE_NAME}"
  }
}
#-------------------------------------------------------------------------
data "template_file" "proxy-init" {
  template = file("scripts/proxy-init.tpl")
}
#-------------------------------------------------------------------------
data "template_cloudinit_config" "cloudinit-gitlab" {
  gzip          = false
  base64_encode = false

  part {
    content_type = "text/cloud-config"
    content      = data.template_file.proxy-init.rendered
    filename     = "cloud-config"
  }

  part {
    content_type = "text/x-shellscript"
    content      = data.template_file.userdata.rendered
  }
}
#-----------------------------------------------------------------------------------------------------