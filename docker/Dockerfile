FROM python:3.12-slim-bookworm AS base_os
ARG VERSION
ARG GIT_SHA
ARG BUILD_DATE

RUN set -x \
  && runtimeDeps=" \
    nginx \
    gettext \
    libmagic1 \
    libxml2 \
    libldap-2.5-0 \
  " \
  && buildDeps=" \
wget \
" \
  && apt-get update && apt-get install -y --no-install-recommends ${buildDeps} ${runtimeDeps} \
  && apt-get purge -y --auto-remove $buildDeps

RUN groupadd --gid 1024 os4d \
    && adduser --disabled-login --disabled-password --no-create-home --ingroup os4d -q birder

# ------- deps -------
FROM base_os AS deps
RUN set -x \
    && buildDeps="build-essential \
cmake \
curl \
gcc \
git \
libfontconfig1 \
libgconf-2-4 \
libglib2.0-0 \
libldap2-dev \
libnss3 \
libsasl2-dev \
libssl-dev \
libxml2-dev  \
libzbar-dev \
python3-dev \
zlib1g-dev  \
" \
    && apt-get update \
    && apt-get install -y --no-install-recommends $buildDeps \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip install uwsgi uv circus

# ------- builder -------
FROM deps AS builder
ENV VIRTUAL_ENV=/venv \
    UV_PROJECT_ENVIRONMENT=/venv

RUN <<EOF cat> /RELEASE
{"version": "$VERSION",
  "commit": "$GIT_SHA"
  "date": "$BUILD_DATE"
}
EOF
RUN mkdir /code /venv

WORKDIR /code
COPY . /code

RUN ls -al /code/src/
RUN uv venv --no-cache $VIRTUAL_ENV \
    && uv sync --no-dev --frozen --no-editable --no-cache

FROM base_os AS dist
ADD docker/conf /conf/
ADD docker/bin/* /usr/local/bin/

COPY --from=builder /usr/local/bin/uwsgi /usr/local/bin/circusd /usr/local/bin/
COPY --from=builder /venv /venv

ENV PATH=/venv/bin:/usr/local/bin/:/usr/bin:/bin:/usr/sbin \
    VERSION=$VERSION \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    DJANGO_SETTINGS_MODULE="birder.config.settings" \
    STATIC_URL="/static/" \
    PYTHONPATH=""\
    GIT_SHA=$GIT_SHA \
    PGSSLCERT="/tmp/postgresql.crt" \
    UWSGI_PROCESSES=4

EXPOSE 8000
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["run"]

LABEL maintainer="brd@os4d.org"
LABEL org.opencontainers.image.authors="brd@os4d.org"
LABEL org.opencontainers.image.created="$BUILD_DATE"
LABEL org.opencontainers.image.description="Birder: Open source service uptime monitor"
LABEL org.opencontainers.image.documentation="https://github.com/os4d/birder/"
LABEL org.opencontainers.image.licenses="https://github.com/os4d/birder/blob/${GIT_SHA:-develop}/LICENSE.md"
LABEL org.opencontainers.image.revision=$GIT_SHA
LABEL org.opencontainers.image.source="https://github.com/os4d/birder/tree/${GIT_SHA:-develop}/"
LABEL org.opencontainers.image.title="Birder"
LABEL org.opencontainers.image.version="$VERSION"
LABEL org.opencontainers.image.url="https://hub.docker.com/repository/docker/os4d/birder/tags/"
LABEL org.opencontainers.image.vendor="OS4D"
