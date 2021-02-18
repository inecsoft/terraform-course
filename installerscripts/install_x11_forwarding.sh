#!/bin/bash

cat << EOF >> ~/.bashrc
#Install a Windows X11 server to enable graphical Linux applications on Windows.
#Install VcXsrv , vncserver :1 -geometry 1200x700 -localhost
# in WSL 1
DISPLAY=:0.0
export DISPLAY
# in WSL 2
export DISPLAY=$(awk '/nameserver / {print $2; exit}' /etc/resolv.conf 2>/dev/null):0
export LIBGL_ALWAYS_INDIRECT=1
EOF