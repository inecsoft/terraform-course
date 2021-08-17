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
  for_each = toset(var.iot-name)

  file_permission = "0744"
  content         = aws_iot_certificate.iot-cert[each.key].certificate_pem
  filename        = "${path.module}/certs/${each.key}/${each.key}.pem.crt"
}
#--------------------------------------------------------------------------------------
# Output private key to /cert/{iot-name} folder
#--------------------------------------------------------------------------------------
resource "local_file" "iot-private-key" {
  for_each = toset(var.iot-name)

  file_permission = "0744"
  content         = aws_iot_certificate.iot-cert[each.key].private_key
  filename        = "${path.module}/certs/${each.key}/${each.key}.private.key"
}
#--------------------------------------------------------------------------------------
# Output public key to /cert/{iot-name} folder
#--------------------------------------------------------------------------------------
resource "local_file" "iot-public-key" {
  for_each = toset(var.iot-name)

  file_permission = "0644"
  content         = aws_iot_certificate.iot-cert[each.key].public_key
  filename        = "${path.module}/certs/${each.key}/${each.key}.public.key"
}
#--------------------------------------------------------------------------------------
resource "local_file" "iot-startup" {
  depends_on = [data.aws_iot_endpoint.endpoint]
  for_each   = toset(var.iot-name)

  file_permission = "0711"
  content         = <<EOF
# stop script on error
set -e

# Check to see if root CA file exists, download if not
if [ ! -f ./root-CA.crt ]; then
  printf "\nDownloading AWS IoT Root CA certificate from AWS...\n"
  curl https://www.amazontrust.com/repository/AmazonRootCA1.pem > root-CA.crt
fi

# Check to see if AWS Device SDK for Python exists, download if not
if [ ! -d ./aws-iot-device-sdk-python ]; then
  printf "\nCloning the AWS SDK...\n"
  git clone https://github.com/aws/aws-iot-device-sdk-python.git
fi

# Check to see if AWS Device SDK for Python is already installed, install if not
if ! python -c "import AWSIoTPythonSDK" &> /dev/null; then
  printf "\nInstalling AWS SDK...\n"
  pushd aws-iot-device-sdk-python
  python setup.py install
  result=$?
  popd
  if [ $result -ne 0 ]; then
    printf "\nERROR: Failed to install SDK.\n"
    exit $result
  fi
fi

# run pub/sub sample app using certificates downloaded in package
printf "\nRunning pub/sub sample application...\n"
python aws-iot-device-sdk-python/samples/basicPubSub/basicPubSub.py -e "${data.aws_iot_endpoint.endpoint.endpoint_address}" -r root-CA.crt -c "${each.key}.pem.crt" -k "${each.key}.private.key"
EOF

  filename = "${path.module}/certs/${each.key}/${each.key}.iot-startup.sh"
}
#--------------------------------------------------------------------------------------
