#---------------------------------------------------------------
resource  "aws_key_pair" "betterproject" {
   key_name = "betterproject"
   public_key = "${file("${var.PATH_TO_PUBLIC_KEY}")}"
}
#---------------------------------------------------------------
