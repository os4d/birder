DOCKER_IMAGE?=os4d/birder
VERSION:=$(shell cd .. && uvx --with hatch-vcs hatchling metadata version)
CMD?=run
RUN_OPTIONS?=
BUILD_DATE:="$(shell date +"%Y-%m-%d %H:%M")"
SOURCE_COMMIT=$(shell git rev-parse --short HEAD)

.ONESHELL:
.DEFAULT_GOAL := help
.PHONY: help run build shell


define PRINT_HELP_PYSCRIPT
import re, sys

for line in sys.stdin:
	match = re.match(r'^([a-zA-Z_-]+):.*?## (.*)$$', line)
	if match:
		target, help = match.groups()
		print("%-20s %s" % (target, help))
endef
export PRINT_HELP_PYSCRIPT

BROWSER := python -c "$$BROWSER_PYSCRIPT"

help:
	@python -c "$$PRINT_HELP_PYSCRIPT" < $(MAKEFILE_LIST)


build: ## build docker image
	@cd .. && uv build --sdist
	DOCKER_BUILDKIT=1 cd .. && docker build \
			--build-arg VERSION=${VERSION} \
			--build-arg DISTDIR=dist \
			--platform=linux/amd64 \
			-t ${DOCKER_IMAGE}:${VERSION} \
			-f docker/Dockerfile .
	docker images | grep "${DOCKER_IMAGE}" | grep ${VERSION}


.run:
	cd .. && docker run \
		--rm \
		--platform=linux/amd64 \
		-p 8000:8000 \
		-p 8888:8888 \
		-e ALLOWED_HOSTS="*" \
		-e DEBUG="0" \
		-e CACHE_URL="${CACHE_URL}" \
		-e VALKEY_URL="${VALKEY_URL}" \
		-e LOGGING_LEVEL="DEBUG" \
		-e SUPERUSERS=${SUPERUSERS} \
		-e DATABASE_URL=${DATABASE_URL} \
		-e STATIC_URL="static/" \
		-v ${PWD}/bin/docker-entrypoint.sh:/usr/local/bin/docker-entrypoint.sh \
		-v ${PWD}/conf:/conf \
		-v dist:/dist \
		${RUN_OPTIONS} \
		-t ${DOCKER_IMAGE}:${VERSION} \
		${CMD}


run: ## run docker image
	CMD='run' \
	RUN_OPTIONS='' \
	$(MAKE) .run

shell: ## enter docker shell
	CMD='/bin/bash' \
	RUN_OPTIONS='-it' \
	$(MAKE) .run
