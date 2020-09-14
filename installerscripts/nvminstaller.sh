#! /bin/bash

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

echo "Reloading shell config"
source ~/.bashrc

echo "Checking nvm command was installed"
command -v nvm

echo install nodejs version v12.18.3
nvm install v12.18.3