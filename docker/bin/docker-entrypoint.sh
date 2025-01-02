#!/bin/sh -e


export MEDIA_ROOT="${MEDIA_ROOT:-/app/media}"
export STATIC_ROOT="${STATIC_ROOT:-/app/static/}"
export UWSGI_PROCESSES="${UWSGI_PROCESSES:-"4"}"
export DJANGO_SETTINGS_MODULE="birder.config.settings"

export START_APP="${START_APP:-True}"
export START_WORKER="${START_WORKER:-True}"
export START_CRON="${START_CRON:-True}"

mkdir -p $MEDIA_ROOT $STATIC_ROOT /var/lib/nginx
chown -R brd:os4d /app /var/lib/nginx

echo 111111

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
