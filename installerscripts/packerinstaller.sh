PACKER_ZIP_FILE=packer_1.4.5_linux_amd64.zip
PACKER=https://releases.hashicorp.com/packer/1.4.5
PACKER_BIN=packer

function install_packer {
    if [ -z $(which $PACKER_BIN) ]
       then
           wget ${PACKER}/${PACKER_ZIP_FILE}
           unzip ${PACKER_ZIP_FILE}
           sudo mv ${PACKER_BIN} /usr/local/bin/${PACKER_BIN}
           rm -rf ${PACKER_ZIP_FILE}
    else
       echo "packer is most likely installed"
    fi
 
}
 
install_packer 