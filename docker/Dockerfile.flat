FROM python:3.6.8-alpine3.8
ARG VERSION
ENV VERSION=${VERSION}

RUN apk add --no-cache --virtual .build-deps \
        build-base \
        gcc \
        musl-dev \
        python3-dev \
        libffi-dev \
        libressl-dev \
        libxml2-dev \
        linux-headers \
        postgresql-dev \
        zeromq-dev

RUN apk add --no-cache --virtual .run-deps \
        --repository http://dl-cdn.alpinelinux.org/alpine/edge/main \
        --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing \
        gosu \
        libpq \
        redis \
        zeromq

RUN addgroup --gid 1024 birder \
    && adduser --disabled-password --ingroup birder -S birder \
    && mkdir /code \
    && mkdir -p /var/db/


ADD Pipfile.lock /code
ADD Pipfile /code
ADD docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh
ADD docker/circus.conf /etc/circus.conf
ADD docker/redis.conf /etc/redis.conf
ADD docker/birder-${VERSION}.tar.gz /code

WORKDIR /code

RUN pip install pipenv \
    && pipenv install --verbose --system --deploy --ignore-pipfile \
    && find /code/ -name "birder-${VERSION}" | xargs pip install

RUN apk del .build-deps

ENTRYPOINT ["docker-entrypoint.sh"]

VOLUME /var/db/

CMD ["monitor"]

##ENTRYPOINT ["python"]
#CMD ["gunicorn", "--bind", "0.0.0.0:5000", "bitcaster.wsgi:app"]

