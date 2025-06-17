# Birder

---

[![Test](https://github.com/os4d/birder/actions/workflows/test.yml/badge.svg)](https://github.com/os4d/birder/actions/workflows/test.yml)
[![Lint](https://github.com/os4d/birder/actions/workflows/lint.yml/badge.svg)](https://github.com/os4d/birder/actions/workflows/lint.yml)
[![codecov](https://codecov.io/github/os4d/birder/graph/badge.svg?token=DPDAWG3FHP)](https://codecov.io/github/os4d/birder)
[![Documentation](https://github.com/os4d/birder/actions/workflows/docs.yml/badge.svg)](https://os4d.github.io/birder/)
[![Docker Pulls](https://img.shields.io/docker/pulls/os4d/birder)](https://hub.docker.com/repository/docker/os4d/birder/tags)
[![Pypi](https://badge.fury.io/py/os4d-birder.svg)](https://badge.fury.io/py/os4d-birder)

![screenshot](https://github.com/os4d/birder/blob/develop/docs/src/img/screenshot.png?raw=true)
![screenshot](https://github.com/os4d/birder/blob/develop/docs/src/img/smtp.png?raw=true)


Birder is an Open source service uptime monitor.
It is not intended to be a replacement of Nagios or other system administrator's monitoring tools,
it has been designed to be simple and easy do deploy on any environment,
its audience is web site users to display SLA compliance and systems availability.

It is provided both as [Python package](https://pypi.org/project/os4d-birder/) as well as [Docker Image](https://hub.docker.com/repository/docker/os4d/birder/general)

## Supported Checkers

 - http/https
 - Postgres/Postgis
 - Redis
 - RabbitMQ / AMQP
 - MySQL/MariaDB
 - MemCached
 - SSH
 - FTP
 - SMTP
 - LDAP / ActiveDirectory

### Specialised Checkers

 - JSON
 - XML
 - Celery (workers running not only broker)


## Contributing

Test locally:

    docker compose -f services-compose.yml down
    ./manage.py upgrade
    ./manage.py demo
    ./manage.py runserver
