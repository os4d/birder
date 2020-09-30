DEVELOP?=0
DOCKER_USER?=
VERSION?=0.31.0
BASE?=$(shell echo "${VERSION}" | sed "s/\([0-9]*\)\.\([0-9]*\)\.\(.*\)/\1.\2/g" )
BUILD_DATE:="$(shell date +"%Y-%m-%d %H:%M")"
# below vars are used internally
BUILD_OPTIONS?=--squash
CMD?=
CONTAINER_NAME?=
DOCKER_IMAGE_NAME=os4d/birder
DOCKER_IMAGE=${DOCKER_IMAGE_NAME}:${VERSION}
DOCKERFILE?=Dockerfile
RUN_OPTIONS?=
PIPENV_ARGS?=

help:
	@echo "dev                  build dev image (based on local code)"
	@echo "build                build production image (based on tag ${VERSION})"
	@echo "release              release tag ${VERSION} on docker hub"
	@echo "run                  run ${DOCKER_IMAGE} locally"
	@echo "ignore               run ${DOCKER_IMAGE} locally"
	@echo "bump	 				bump version"


build-base:
	cd .. && docker build \
			${BUILD_OPTIONS} \
			--build-arg BUILD_DATE=${BUILD_DATE} \
			-t os4d/birder-base:0 \
			-f docker/Dockerfile.base .
	docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}
	docker images | grep ${DOCKER_IMAGE_NAME}
	docker push os4d/birder-base:0

check:
	@[ -z "`git status --porcelain`" ] || ( echo "Uncommited changes"; exit 1 )
	@[ -z "`docker images -q ${DOCKER_TARGET}`" ] || ( echo "Docker image '${DOCKER_TARGET}' already exists"; exit 1 )
	@[ -n "`git tag -l ${VERSION}`" ] || git tag -m "v${VERSION}"  ${VERSION}


build: check
	cd .. && python setup.py sdist --dist-dir docker
	cd .. && docker build \
			${BUILD_OPTIONS} \
			--build-arg BASE_IMAGE="${BASE}" \
			--build-arg DEVELOP=${DEVELOP} \
			--build-arg VERSION=${VERSION} \
			--build-arg BUILD_DATE=${BUILD_DATE} \
			-t ${DOCKER_IMAGE} \
			-f docker/${DOCKERFILE} .
	docker images | grep ${DOCKER_IMAGE_NAME}


.run:
	cd .. && docker run \
	 		--rm \
	 		--name=${CONTAINER_NAME} \
			-p 5000:5000 \
			-e "TERM=xterm-256color" \
			-e MONITORa_BIRDER=http://localhost:5000 \
			-e ADMINS=sax:123 \
			-v /tmp/~birder:/var/db \
			${RUN_OPTIONS} \
			${DOCKER_IMAGE} \
			${CMD}


release:
	docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}
	docker tag ${DOCKER_IMAGE_NAME}:${VERSION} ${DOCKER_IMAGE_NAME}:latest
	docker push ${DOCKER_IMAGE_NAME}:${VERSION}
	docker push ${DOCKER_IMAGE_NAME}:latest

run:
	$(MAKE) .run

shell:
	CMD=/bin/sh RUN_OPTIONS=-it $(MAKE) .run


