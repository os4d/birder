ARG BASE_IMAGE
FROM os4d/birder-base:${BASE_IMAGE}
ARG BUILD_DATE
ARG VERSION

LABEL Date = $BUILD_DATE
ENV VERSION=${VERSION}

ADD docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh
ADD docker/circus.conf /etc/circus.conf
ADD docker/redis.conf /etc/redis.conf
ADD docker/birder-${VERSION}.tar.gz /code

WORKDIR /code

COPY . /code
WORKDIR /code
RUN set -ex \
    ls -al /code \
    && pip install pip \
    && sha1sum -c /CHECKSUM \
    && poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["monitor"]
