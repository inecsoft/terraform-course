#!/bin/bash -e -x

echo "*** Disable automatic updates on boot ***"
systemctl stop apt-daily.timer
systemctl disable apt-daily.timer
systemctl mask apt-daily.service
systemctl stop apt-daily-upgrade.timer
systemctl disable apt-daily-upgrade.timer
systemctl mask apt-daily-upgrade.service
systemctl daemon-reload