#!/bin/bash

read -p "Enter User Name: `echo $'\n> '`" GIT_USER
read -p "Enter Password: `echo $'\n> '`"  GIT_PASS

git config --global credential.helper "store --file ~/.gitcredential" &&
(echo -e "protocol=https\nhost=github.com\nusername=$GIT_USER\npassword=$GIT_PASS\n" | git credential fill ; echo ) | git credential approve || exit 1

git config --global core.editor "vim"

cat << EOF >> ~/.bashrc

parse_git_branch() {
     git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}
export PS1="\u@\h \[\e[32m\]\w \[\e[91m\]\$(parse_git_branch)\[\e[00m\]$ "
EOF

cat << EOF >> ~/.bashrc
export GIT_EDITOR=vim
EOF

source ~/.bashrc


