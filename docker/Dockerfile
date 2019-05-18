FROM os4d/birder-base:0
ARG BUILD_DATE
ARG VERSION

LABEL Date = $BUILD_DATE
ENV VERSION=${VERSION}

ADD docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh
ADD docker/circus.conf /etc/circus.conf
ADD docker/redis.conf /etc/redis.conf
ADD docker/birder-${VERSION}.tar.gz /code

WORKDIR /code

RUN find /code/ -name "birder-${VERSION}" | xargs pip install

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["monitor"]
