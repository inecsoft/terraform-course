data "template_file" "redhat-init" {
  template = file("scripts/redhat-init.sh")
  vars = {

    this_rds_cluster_endpoint        = "${module.aurora.this_rds_cluster_endpoint}"
    this_rds_cluster_reader_endpoint = "${module.aurora.this_rds_cluster_reader_endpoint}"
    this_rds_cluster_database_name   = "${module.aurora.this_rds_cluster_database_name}"
    this_rds_cluster_master_username = "${module.aurora.this_rds_cluster_master_username}"
    this_rds_cluster_master_password = "${module.aurora.this_rds_cluster_master_password}"
    this_rds_cluster_port            = "${module.aurora.this_rds_cluster_port}"

  }

}


data "template_cloudinit_config" "cloudinit-redhat" {
  gzip          = false
  base64_encode = false

  part {
    content_type = "text/x-shellscript"
    content      = data.template_file.redhat-init.rendered
  }

  part {
    content_type = "text/x-shellscript"
    content      = data.template_file.suluq_vpc_efsscript.rendered
  }

}

