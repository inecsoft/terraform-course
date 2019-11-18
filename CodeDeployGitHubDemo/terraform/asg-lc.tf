#---------------------------------------------------------------------------------------------------------
resource "aws_launch_configuration" "performce" {
    name                        = "performce"
    image_id                    = "${lookup(var.AMIS, var.AWS_REGION)}"
    instance_type               = "${var.instance_type}"
    key_name                    = "${aws_key_pair.mykey.key_name}"
    security_groups             = ["${aws_security_group.my_security_group.id}"]
    associate_public_ip_address = true
    #user_data                   = "IyEvYmluL2Jhc2gKc2xlZXAgNW0Kc3VkbyBzdSAtIHJvb3QKIyBJbnN0YWxsIEFXUyBFRlMgVXRpbGl0aWVzCnl1bSBpbnN0YWxsIC15IGFtYXpvbi1lZnMtdXRpbHMKIyBNb3VudCBFRlMKbWtkaXIgL2VmcwplZnNfaWQ9ImZzLTUyNmNlMzk5Igptb3VudCAtdCBlZnMgJGVmc19pZDovIC9lZnMKIyBFZGl0IGZzdGFiIHNvIEVGUyBhdXRvbWF0aWNhbGx5IGxvYWRzIG9uIHJlYm9vdAplY2hvICRlZnNfaWQ6LyAvZWZzIGVmcyBkZWZhdWx0cyxfbmV0ZGV2IDAgMCA+PiAvZXRjL2ZzdGFiCgp5dW0gLXkgdXBkYXRlCnl1bSBpbnN0YWxsIC15IHJ1YnkKeXVtIGluc3RhbGwgLXkgYXdzLWNsaQpjZCAvaG9tZS9lYzItdXNlcgphd3MgczMgY3AgczM6Ly9hd3MtY29kZWRlcGxveS1ldS13ZXN0LTEvbGF0ZXN0L2luc3RhbGwgLiAtLXJlZ2lvbiBldS13ZXN0LTEKY2htb2QgK3ggLi9pbnN0YWxsCi4vaW5zdGFsbCBhdXRv"
    enable_monitoring           = false
    ebs_optimized               = false

}
#---------------------------------------------------------------------------------------------------------
resource "aws_autoscaling_group" "performce" {
    desired_capacity          = 1
    health_check_grace_period = 0
    health_check_type         = "EC2"
    launch_configuration      = "performce"
    max_size                  = 2
    min_size                  = 1
    default_cooldown          = 300
    enabled_metrics           = []
    load_balancers            = []
    name                      = "performce"
    vpc_zone_identifier       = ["${aws_subnet.my_vpc_subnet_public[0].id}"]
    availability_zones        = ["eu-west-1a", ]

}
#---------------------------------------------------------------------------------------------------------

