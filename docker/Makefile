# envs to set before use this script
.ONESHELL:

#BASE?=$(shell echo "${VERSION}" | sed "s/\([0-9]*\)\.\([0-9]*\)\.\(.*\)/\1.\2/g" )
VERSION := $(shell grep -m 1 version ../pyproject.toml | tr -s ' ' | tr -d '"' | tr -d "'" | cut -d' ' -f3)
RELEASE = $(shell grep -m 1 version ../pyproject.toml | tr -s ' ' | tr -d '"' | tr -d "'" | cut -d' ' -f3)
LOCK_CHECKSUM?=$(shell sha1sum ../uv.lock | awk '{print $$1}')
LOCK_HASH?=$(shell echo ${LOCK_CHECKSUM} | cut -c 1-8)

DOCKER_IMAGE_NAME?=os4d/birder

CMD?=run
VERSION?=dev
STAGE?=dist

RUN_OPTIONS?=
BUILD_OPTIONS?=

BUILD_DATE:="$(shell date +"%Y-%m-%d %H:%M")"
SOURCE_COMMIT=$(shell git rev-parse --short HEAD)

.PHONY: help runlocal tests
.DEFAULT_GOAL := help


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


.build:
	DOCKER_BUILDKIT=1 cd .. && docker build \
			--build-arg VERSION=${VERSION} \
			--build-arg RELEASE=${RELEASE} \
			--build-arg BUILD_DATE=${BUILD_DATE} \
			--build-arg GIT_SHA=${SOURCE_COMMIT} \
			--target ${STAGE} \
			--no-cache \
			${BUILD_OPTIONS} \
			-t ${DOCKER_IMAGE} \
			-f docker/Dockerfile .
	docker images | grep "${DOCKER_IMAGE_NAME}" | grep ${VERSION}-${STAGE}
	docker inspect ${DOCKER_IMAGE} | jq -r '.[0].Config.Labels'

build:  ## build image
	DOCKER_IMAGE=${DOCKER_IMAGE_NAME}:${VERSION}-${STAGE} \
	$(MAKE) .build

.build-stage:
	DOCKER_IMAGE=${DOCKER_IMAGE_NAME}:${VERSION}-${STAGE} \
	$(MAKE) .build

base_os:
	STAGE=base_os $(MAKE) .build-stage

builder:
	STAGE=builder $(MAKE) .build-stage

tests:
	STAGE=tests $(MAKE) .build-stage

production:
	STAGE=production $(MAKE) .build-stage

dist:
	STAGE=dist $(MAKE) .build-stage


step1: base_os
step2: builder
step3: tests
step4: production
step5: dist

build1: base_os
build2: builder
build3: tests
build4: production
build5: dist

.run:
	cd .. && docker run \
	 		--rm \
			-p 8000:8000 \
			-e ALLOWED_HOSTS="*" \
			-e CACHE_URL="${CACHE_URL}" \
			-e CELERY_BROKER_URL=${CELERY_BROKER_URL} \
			-e DEBUG="1" \
			-e LOGGING_LEVEL="DEBUG" \
			-e SUPERUSERS=${SUPERUSERS} \
			-v ${PWD}/conf:/conf \
			${RUN_OPTIONS} \
			-t ${DOCKER_IMAGE} \
			${CMD}

run:
	DOCKER_IMAGE=${DOCKER_IMAGE_NAME}:${VERSION}-dist \
 	STAGE='dist' \
 	CMD='run' \
	$(MAKE) .run

.run-step:
	DOCKER_IMAGE=${DOCKER_IMAGE_NAME}:${VERSION}-${STAGE} \
	RUN_OPTIONS="-it" \
 	CMD='/bin/bash' \
	$(MAKE) .run



run1:
	STAGE=base_os \
	$(MAKE) .run-step

run2:
	STAGE=builder \
	$(MAKE) .run-step

run3:
	STAGE=tests \
	$(MAKE) .run-step

run4:
	STAGE=production \
	$(MAKE) .run-step

run5:
	STAGE=dist \
	$(MAKE) .run-step

all: step1 step2 step3 step4 step5


.shell:
	RUN_OPTIONS=-it \
	CMD=/bin/bash \
	$(MAKE) .run

shell1:
	DOCKER_IMAGE=${DOCKER_IMAGE_NAME}:${VERSION}-base_os \
	$(MAKE) .shell

shell2:
	DOCKER_IMAGE=${DOCKER_IMAGE_NAME}:${VERSION}-builder \
	$(MAKE) .shell

shell3:
	DOCKER_IMAGE=${DOCKER_IMAGE_NAME}:${VERSION}-tests \
	$(MAKE) .shell

shell4:
	DOCKER_IMAGE=${DOCKER_IMAGE_NAME}:${VERSION}-production \
	$(MAKE) .shell

shell5:
	DOCKER_IMAGE=${DOCKER_IMAGE_NAME}:${VERSION}-dist \
	$(MAKE) .shell
