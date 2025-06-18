#!/bin/sh -e


export MEDIA_ROOT="${MEDIA_ROOT:-/app/media}"
export STATIC_ROOT="${STATIC_ROOT:-/app/static/}"

mkdir -p $MEDIA_ROOT $STATIC_ROOT /var/lib/nginx
chown -R birder:os4d /app /var/lib/nginx

echo "Command line is: '$1'"

case "$1" in
    run | "")
      birder upgrade
      circusd /conf/circus.ini
      ;;
    check)
       birder check --deploy
      ;;
    upgrade)
      birder upgrade --force
      ;;
    app)
      export START_WORKER=false
      export START_CRON=false
      export START_APP=true
      circusd /conf/circus.ini
      ;;
    worker)
      set -- gosu brd:os4d django-admin rundramatiq
      ;;
    beat)
      set -- gosu brd:os4d django-admin crontab
      ;;
esac

exec "$@"
