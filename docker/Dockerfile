FROM python:3.12-slim-bookworm AS base_os
ARG VERSION
ARG DISTDIR

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
    && adduser --disabled-login --disabled-password --no-create-home --ingroup os4d -q brd

# ------- builder -------
FROM base_os AS builder
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

RUN pip install uwsgi

FROM base_os AS dist
COPY --from=builder /usr/local/bin/uwsgi /usr/local/bin/

ENV PATH=/venv/bin:/usr/local/bin/:/usr/bin:/bin \
    VERSION=$VERSION \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    DJANGO_SETTINGS_MODULE="birder.config.settings" \
    STATIC_URL="/static/" \
    PYTHONPATH=""\
    PGSSLCERT="/tmp/postgresql.crt" \
    UV_PROJECT_ENVIRONMENT=/venv \
    VIRTUAL_ENV=/venv \
    UWSGI_PROCESSES=4

RUN <<EOF cat> /RELEASE
{"version": "$VERSION",
}
EOF
WORKDIR /app
ADD docker/conf /conf/
ADD docker/bin/* /usr/local/bin/
ADD dist/* /tmp

RUN python3 -m venv /venv \
    && /venv/bin/pip install --find-links=/tmp os4d_birder==${VERSION}

EXPOSE 8000
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["run"]


LABEL maintainer="brd@os4d.org"
LABEL org.opencontainers.image.authors="brd@os4d.org"
LABEL org.opencontainers.image.description="Birder"
LABEL org.opencontainers.image.documentation="https://github.com/os4d/birder/"
LABEL org.opencontainers.image.title="brd Country Workspace"
LABEL org.opencontainers.image.licenses="https://github.com/os4d/birder/blob/master/LICENSE"
LABEL org.opencontainers.image.source="https://github.com/os4d/birder"
LABEL org.opencontainers.image.url="https://hub.docker.com/repository/docker/os4d/bbirder/tags/"
LABEL org.opencontainers.image.vendor="os4d"
LABEL org.opencontainers.image.version="$VERSION"
