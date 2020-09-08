##!/bin/bash -xv
#!/bin/bash 

version=0.12.20
TERRAFORM_ZIP_FILE=terraform_${version}_linux_amd64.zip
TERRAFORM=https://releases.hashicorp.com/terraform/$version
TERRAFORM_BIN=terraform
 
function install_terraform {
    if [ -z $(which $TERRAFORM_BIN) ]
       then
           wget  ${TERRAFORM}/${TERRAFORM_ZIP_FILE}
           unzip ${TERRAFORM_ZIP_FILE}
           sudo mv ${TERRAFORM_BIN} /usr/local/bin/${TERRAFORM_BIN}
           rm -rf ${TERRAFORM_ZIP_FILE}
           echo 'terraform was installed'
           terraform version
    fi  

}
 
install_terraform 

versions=(`terraform version | grep -Eo [0-9]\.[0-9][0-9]\.[0-9]`)

function update_terraform {

    if [  -z ${versions[1]} ]  ; then
    
             echo "Terraform is most likely installed and updated"
             exit
    else
              TERRAFORM_ZIP_FILE=terraform_${versions[1]}_linux_amd64.zip
              TERRAFORM=https://releases.hashicorp.com/terraform/${versions[1]}
              wget  ${TERRAFORM}/${TERRAFORM_ZIP_FILE}
              unzip ${TERRAFORM_ZIP_FILE}
              sudo mv ${TERRAFORM_BIN} /usr/local/bin/${TERRAFORM_BIN}
              rm -rf ${TERRAFORM_ZIP_FILE}
              echo "Terraform is installed with latest version ${versions[1]}" 
    fi
}

update_terraform 