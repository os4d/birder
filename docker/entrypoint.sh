#!/bin/sh -e

mkdir -p /var/db/
chown :1024 /var/db/
chmod 775 /var/db/ /backups
chmod g+s /var/db/ /backups

if [[ "$*" == "monitor" ]];then
    exec gosu birder circusd /etc/circus.conf
else
    exec "$@"
fi
