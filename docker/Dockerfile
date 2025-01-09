FROM python:3.12-slim-bookworm AS base_os
ARG GOSU_VERSION=1.17
ARG GOSU_SHA256=bbc4136d03ab138b1ad66fa4fc051bafc6cc7ffae632b069a53657279a450de3


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
  && rm -rf /var/lib/apt/lists/* \
  && wget --quiet -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-amd64" \
  && echo "$GOSU_SHA256 /usr/local/bin/gosu" | sha256sum --check --status \
  && chmod +x /usr/local/bin/gosu \
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

RUN pip install uv uwsgi

# ------- tests -------
FROM builder AS tests
ARG BUILD_DATE
ARG GIT_SHA

LABEL distro="tests"
LABEL org.opencontainers.image.created="$BUILD_DATE"
LABEL org.opencontainers.image.version="$VERSION"

ENV PATH=/venv/bin:/usr/local/bin/:/usr/bin:/bin \
    DJANGO_SETTINGS_MODULE=birder.config.settings \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    UV_PROJECT_ENVIRONMENT=/venv \
    VIRTUAL_ENV=/venv \
    UWSGI_PROCESSES=4

WORKDIR /app
COPY uv.lock README.md MANIFEST.in pyproject.toml /app/
COPY src /app/src/

RUN --mount=type=cache,target=/root/.uv-cache \
    find ../src -name 'node_modules' -prune \
        -o -name *.py -o -name *.html -o -name *.js -o -name *.css \
        -type f \
        -exec ls -l "{}" \;  | sha1sum | awk '{print $1}' > CODE_CHECKSUM \
    && uv sync --cache-dir=/root/.uv-cache \
        --python=/usr/local/bin/python \
        --python-preference=system \
        --frozen

# ------- production only deps-------
FROM builder AS production
ENV PATH=/venv/bin:/usr/local/bin/:/usr/bin:/bin \
    DJANGO_SETTINGS_MODULE=birder.config.settings \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    UV_PROJECT_ENVIRONMENT=/venv \
    VIRTUAL_ENV=/venv \
    UWSGI_PROCESSES=4

WORKDIR /app
COPY uv.lock README.md MANIFEST.in pyproject.toml /app/
COPY src /app/src/

RUN --mount=type=cache,target=/root/.uv-cache \
    uv sync --cache-dir=/root/.uv-cache \
        --python=/usr/local/bin/python \
        --python-preference=system \
        --no-dev --frozen --extra distribution



# ------- dist -------
FROM base_os AS dist
ARG BUILD_DATE
ARG GIT_SHA
ARG BRANCH

ENV PATH=/venv/bin:/usr/local/bin/:/usr/bin:/bin \
    BUILD_DATE=$BUILD_DATE \
    GIT_SHA=$GIT_SHA \
    VERSION=$VERSION \
    BRANCH=$BRANCH \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    STATIC_URL="/static/" \
    PYTHONPATH=""\
    PGSSLCERT="/tmp/postgresql.crt" \
    UV_PROJECT_ENVIRONMENT=/venv \
    VIRTUAL_ENV=/venv \
    UWSGI_PROCESSES=4

RUN <<EOF cat> /RELEASE
{"version": "$VERSION",
 "commit": "$GIT_SHA",
 "date": "$BUILD_DATE",
}
EOF
WORKDIR /app
ADD docker/conf /conf/
ADD docker/bin/* /usr/local/bin/

ADD uv.lock README.md MANIFEST.in pyproject.toml /app/
ADD src /app/src/

COPY --chown=brd:os4d --from=production /venv /venv
COPY --from=builder /usr/local/bin/uwsgi /usr/local/bin/uv /usr/local/bin/
RUN --mount=type=cache,target=/root/.uv-cache \
    uv --cache-dir=/root/.uv-cache pip install --no-deps . \
    && rm -fr /app/*


EXPOSE 8000
ENTRYPOINT exec docker-entrypoint.sh "$0" "$@"
CMD ["run"]


LABEL maintainer="brd@os4d.org"
LABEL org.opencontainers.image.authors="brd@os4d.org"
LABEL org.opencontainers.image.description="Birder"
LABEL org.opencontainers.image.documentation="https://github.com/os4d/birder/"
LABEL org.opencontainers.image.title="brd Country Workspace"
LABEL org.opencontainers.image.licenses="https://github.com/os4d/birder/blob/master/LICENSE"
LABEL org.opencontainers.image.revision=$GIT_SHA
LABEL org.opencontainers.image.source="https://github.com/os4d/birder"
LABEL org.opencontainers.image.url="https://hub.docker.com/repository/docker/os4d/bbirder/tags/"
LABEL org.opencontainers.image.vendor="os4d"
LABEL org.opencontainers.image.created="$BUILD_DATE"
LABEL org.opencontainers.image.version="$VERSION"
