FROM python:3.12-slim-bookworm AS base_os
ARG GOSU_VERSION=1.17
ARG GOSU_SHA256=bbc4136d03ab138b1ad66fa4fc051bafc6cc7ffae632b069a53657279a450de3


RUN set -x \
  && runtimeDeps=" \
    libmagic1 \
    libxml2 \
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
libnss3 \
libssl-dev \
libxml2-dev  \
python3-dev \
zlib1g-dev  \
" \
    && apt-get update \
    && apt-get install -y --no-install-recommends $buildDeps \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && \
    apt-get install -y --no-install-recommends gnupg wget curl unzip && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
    apt-get update -y && \
    apt-get install -y --no-install-recommends google-chrome-stable && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/* && \
    CHROME_VERSION=$(google-chrome --product-version) && \
    wget -q --continue -P /chromedriver "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/$CHROME_VERSION/linux64/chromedriver-linux64.zip" && \
    unzip /chromedriver/chromedriver* -d /usr/local/bin/ && \
    rm -rf /chromedriver

RUN pip install uv uwsgi

# ------- tests -------
FROM builder AS tests
ARG BUILD_DATE
ARG GIT_SHA

LABEL distro="tests"
LABEL org.opencontainers.image.created="$BUILD_DATE"
LABEL org.opencontainers.image.version="$VERSION"

ENV PATH=/venv/bin:/usr/local/bin/:/usr/bin:/bin \
    DJANGO_SETTINGS_MODULE=country_workspace.config.settings \
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
    DJANGO_SETTINGS_MODULE=country_workspace.config.settings \
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
COPY docker/conf /conf/
COPY docker/bin/* /usr/local/bin/

COPY . /app/

COPY --chown=brd:os4d --from=production /venv /venv
COPY --from=builder /usr/local/bin/uwsgi /usr/local/bin/uv /usr/local/bin/
RUN --mount=type=cache,target=/root/.uv-cache \
    uv --cache-dir=/root/.uv-cache  pip install --no-deps . \
    && rm -fr /app


EXPOSE 8000
ENTRYPOINT exec docker-entrypoint.sh "$0" "$@"
CMD ["run"]


LABEL maintainer="brd@os4d.org"
LABEL org.opencontainers.image.authors="brd@os4d.org"
LABEL org.opencontainers.image.description="brd Country Workspace"
LABEL org.opencontainers.image.documentation="https://github.com/os4d/brd-country-workspace/"
LABEL org.opencontainers.image.title="brd Country Workspace"
LABEL org.opencontainers.image.licenses="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/blob/${GIT_SHA:-master}/LICENSE"
LABEL org.opencontainers.image.revision=$GIT_SHA
LABEL org.opencontainers.image.source="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/tree/${GIT_SHA:-master}/"
LABEL org.opencontainers.image.url="https://hub.docker.com/repository/docker/os4d/brd-country-workspace/tags/"
LABEL org.opencontainers.image.vendor="os4d"
LABEL org.opencontainers.image.created="$BUILD_DATE"
LABEL org.opencontainers.image.version="$VERSION"
