# envs to set before use this script
.ONESHELL:

#BASE?=$(shell echo "${VERSION}" | sed "s/\([0-9]*\)\.\([0-9]*\)\.\(.*\)/\1.\2/g" )
#VERSION := $(shell grep '__version__' ../src/birder/__init__.py | cut -d'"' -f2)
#RELEASE := $(shell grep '__version__' ../src/birder/__init__.py | cut -d'"' -f2)
#LOCK_CHECKSUM?=$(shell sha1sum ../uv.lock | awk '{print $$1}')
#LOCK_HASH?=$(shell echo ${LOCK_CHECKSUM} | cut -c 1-8)

DOCKER_IMAGE?=os4d/birder
#
#CMD?=run
#VERSION?=dev
#STAGE?=dist
#
#RUN_OPTIONS?=
#BUILD_OPTIONS?=
#
#BUILD_DATE:="$(shell date +"%Y-%m-%d %H:%M")"
#SOURCE_COMMIT=$(shell git rev-parse --short HEAD)
#
#.PHONY: help runlocal tests
#.DEFAULT_GOAL := help


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

VERSION:=$(shell cd .. && uvx --with hatch-vcs hatchling metadata version)
build:

	@cd .. && uv build --sdist -o docker/~tmp/
	ls -al ~tmp/b*
	echo ${VERSION}
	DOCKER_BUILDKIT=1 cd .. && docker build \
			--build-arg VERSION=${VERSION} \
			-t ${DOCKER_IMAGE}:${VERSION} \
			-f docker/Dockerfile .
	#docker images | grep "${DOCKER_IMAGE_NAME}" | grep ${VERSION}-${STAGE}
	#docker inspect ${DOCKER_IMAGE} | jq -r '.[0].Config.Labels'
