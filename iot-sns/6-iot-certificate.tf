#--------------------------------------------------------------------------------------
# Create an aws iot certificate
#--------------------------------------------------------------------------------------
#Note: The CSR must include a public key that is either an RSA key with a length of at least 2048 bits or an ECC key from NIST P-256 or NIST P-384 curves.
#If none is specified both the certificate and keys will be generated
#you need to download root certificate, the public and private key
#--------------------------------------------------------------------------------------
resource "aws_iot_certificate" "iot-cert" {
  #csr   = file("/cert/csr.pem")
  for_each = toset(var.iot-name)
  active   = true
}
#--------------------------------------------------------------------------------------
# Attach AWS iot cert generated above to the aws iot thing(s) 
#--------------------------------------------------------------------------------------
resource "aws_iot_thing_principal_attachment" "iot-principal-attach" {
  for_each = toset(var.iot-name)

  principal = aws_iot_certificate.iot-cert[each.key].arn
  thing     = aws_iot_thing.iot-thing[each.key].name
}
#--------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------
# Output certificate to /cert/{iot-name} folder
#--------------------------------------------------------------------------------------
resource "local_file" "iot-cert-pem" {
  for_each    = toset(var.iot-name)
  
  file_permission      = "0744"
  content     = aws_iot_certificate.iot-cert[each.key].certificate_pem
  filename    = "${path.module}/certs/${each.key}/${substr(aws_iot_certificate.iot-cert[each.key].id,0,12)}.pem.crt"
}
#--------------------------------------------------------------------------------------
# Output private key to /cert/{iot-name} folder
#--------------------------------------------------------------------------------------
resource "local_file" "iot-private-key" {
  for_each    = toset(var.iot-name)
  
  file_permission      = "0744"
  content     = aws_iot_certificate.iot-cert[each.key].private_key
  filename    = "${path.module}/certs/${each.key}/${substr(aws_iot_certificate.iot-cert[each.key].id,0,12)}.private.key"
}
#--------------------------------------------------------------------------------------
# Output public key to /cert/{iot-name} folder
#--------------------------------------------------------------------------------------
resource "local_file" "iot-public-key" {
  for_each    = toset(var.iot-name)
  
  file_permission      = "0644"
  content     = aws_iot_certificate.iot-cert[each.key].public_key
  filename    = "${path.module}/certs/${each.key}/${substr(aws_iot_certificate.iot-cert[each.key].id,0,12)}.public.key"
}
#--------------------------------------------------------------------------------------
