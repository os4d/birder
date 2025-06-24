DOCKER_IMAGE_NAME?=os4d/birder
VERSION:=$(shell cd .. && uvx --with hatch-vcs hatchling metadata version)
BUILD_DATE:="$(shell date +"%Y-%m-%d %H:%M")"
SOURCE_COMMIT=$(shell git rev-parse --short HEAD)
CMD?="run"
RUN_OPTIONS?=

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
	@cd .. && uv build
	DOCKER_BUILDKIT=1 cd .. && docker build \
			--progress=plain \
			--platform=linux/amd64 \
			--build-arg VERSION=${VERSION} \
			--build-arg GIT_SHA=${SOURCE_COMMIT} \
			--build-arg BUILD_DATE=${BUILD_DATE} \
			--cache-from ${DOCKER_IMAGE_NAME}:local \
			--cache-from ${DOCKER_IMAGE_NAME}:latest \
			-t ${DOCKER_IMAGE_NAME}:${VERSION} \
			-t ${DOCKER_IMAGE_NAME}:local \
			-f docker/Dockerfile .
	docker images | grep "${DOCKER_IMAGE_NAME}" | grep -e ${VERSION} -e local


.run:
	cd .. && docker run \
		--rm \
		--platform=linux/amd64 \
		-p 8000:8000 \
		-e ALLOWED_HOSTS="*" \
		-e ADMIN_EMAIL="admin@os4d.org" \
		-e ADMIN_PASSWORD="password" \
		-e CSRF_TRUSTED_ORIGINS="http://localhost:8000" \
		-e CRYPT_SALT_KEYS="123" \
		-e CRYPT_KEYS="really-unsafe-super-secret-crypt-key-just-for-testing" \
		-e DEBUG="1" \
		-e CACHE_URL="redis://host.docker.internal:6379" \
		-e VALKEY_URL="redis://host.docker.internal:6379" \
		-e DATABASE_URL=sqlite:///birder.sqlite \
		-e LOGGING_LEVEL="DEBUG" \
		-e SECURE_HSTS_SECONDS=10 \
		-e SECRET_KEY="really-unsafe-super-secret-key-just-for-testing-purposes" \
		-e SUPERUSERS=${SUPERUSERS} \
		-e STATIC_URL="static/" \
		${RUN_OPTIONS} \
		-t ${DOCKER_IMAGE_NAME}:local \
		${CMD}


run: ## Run docker build
	DOCKER_IMAGE=${DOCKER_IMAGE_NAME}:${VERSION} \
	$(MAKE) .run


check: ## Check docker build
	CMD='sh /usr/local/bin/check.sh' \
	DOCKER_IMAGE=${DOCKER_IMAGE_NAME}:${VERSION} \
	$(MAKE) .run


shell:  ## Run shell into docker
	DOCKER_IMAGE=${DOCKER_IMAGE_NAME}:${VERSION} \
	RUN_OPTIONS="-it" \
 	CMD='/bin/bash' \
	$(MAKE) .run
