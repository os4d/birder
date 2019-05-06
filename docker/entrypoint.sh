#!/bin/sh -e

chown birder:birder /var/db/

if [[ "$*" == "monitor" ]];then
    exec gosu birder circusd /etc/circus.conf
else
    exec "$@"
fi
