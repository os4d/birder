FROM python:3.12-slim-bookworm AS base_os

RUN pip install birder\


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
