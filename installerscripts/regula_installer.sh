#!/bin/bash
# set -x

version=2.5.0
read -ep "Do you want to install regula version: ${version}`echo -e '\n' or Enter a new version to continue:'\n'` " versions
echo $versions

if [ -z $versions ]
 then 
   version=$version
 else
  version=$versions

fi

REGULA_ZIP_FILE=regula_${version}_Linux_x86_64.tar.gz
REGULA_URL=https://github.com/fugue/regula/releases/download/v${version}/regula_${version}_Linux_x86_64.tar.gz
REGULA_BIN=regula

function install_regula {
    if [ -z $(which $REGULA_BIN) ]
        then
           wget ${REGULA_URL}
           gunzip -c ${REGULA_ZIP_FILE} | tar xopf -
           sudo mv ${REGULA_BIN} /usr/local/bin/${REGULA_BIN}
           rm -rf ${REGULA_ZIP_FILE}
           echo 'regula was installed'
           regula version
    fi  
}

install_regula
