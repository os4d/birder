#!/bin/sh -e


if [[ "$*" == "monitor" ]];then
    exec gosu birder circusd /etc/circus.conf
else
    exec "$@"
fi
