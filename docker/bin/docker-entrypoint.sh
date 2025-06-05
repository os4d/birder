#!/bin/sh -e


export MEDIA_ROOT="${MEDIA_ROOT:-/app/media}"
export STATIC_ROOT="${STATIC_ROOT:-/app/static/}"

mkdir -p $MEDIA_ROOT $STATIC_ROOT /var/lib/nginx
chown -R birder:os4d /app /var/lib/nginx

echo "Command line is: '$1'"

case "$1" in
    run)
       django-admin upgrade
       circusd /conf/circus.ini
      ;;
    upgrade)
      django-admin upgrade --force
      ;;
    worker)
      set -- gosu brd:os4d djano-admin rundramatiq
      ;;
    beat)
      set -- gosu brd:os4d djano-admin crontab
      ;;
esac

exec "$@"
