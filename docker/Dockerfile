ARG BASE_IMAGE
FROM os4d/birder-base:${BASE_IMAGE}
ARG BUILD_DATE
ARG VERSION

LABEL Date = $BUILD_DATE
ENV VERSION=${VERSION}
ENV SECRET_KEY=""
ENV ADMINS=""
ENV BOOTSTRAP_SERVE_LOCAL="1"
ENV SM_TITLE="Birder"
ENV BIRDER_REDIS_URL="redis://127.0.0.1:6379/1"

ADD docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh
ADD docker/circus.conf /etc/circus.conf
ADD docker/redis.conf /etc/redis.conf

WORKDIR /code

COPY . /code
WORKDIR /code
RUN set -ex \
    ls -al /code \
    && pip install poetry \
    && sha1sum -c /CHECKSUM \
    && poetry install --no-dev

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["monitor"]
