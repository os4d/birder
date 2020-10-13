DEVELOP?=0
DOCKER_USER?=
VERSION?=1.0.12
BASE?=$(shell echo "${VERSION}" | sed "s/\([0-9]*\)\.\([0-9]*\)\.\(.*\)/\1.\2/g" )
BUILD_DATE:="$(shell date +"%Y-%m-%d %H:%M")"
# below vars are used internally
BUILD_OPTIONS?=--squash
CMD?=
CONTAINER_NAME=birder
DOCKER_IMAGE_NAME=os4d/birder
DOCKER_IMAGE=${DOCKER_IMAGE_NAME}:${VERSION}
DOCKER_TARGET=${DOCKER_IMAGE}
DOCKERFILE?=Dockerfile

RUN_OPTIONS?=
PIPENV_ARGS?=

help:
	@echo "dev                  build dev image (based on local code)"
	@echo "build                build production image (based on tag ${VERSION})"
	@echo "release              release tag ${VERSION} on docker hub"
	@echo "run                  run ${DOCKER_IMAGE} locally"


build-base:
	cd .. && docker build \
			${BUILD_OPTIONS} \
			--build-arg BUILD_DATE=${BUILD_DATE} \
			-t os4d/birder-base:${BASE} \
			-f docker/Dockerfile.base .
	@echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin
	docker images | grep os4d/birder-base:${BASE}
	docker push os4d/birder-base:${BASE}

check:
	@[ -z "`git status --porcelain`" ] || ( echo "Uncommited changes"; exit 1 )
	@[ -z "`docker images -q ${DOCKER_TARGET}`" ] || ( echo "Docker image '${DOCKER_TARGET}' already exists"; exit 1 )
	@[ -n "`git tag -l ${VERSION}`" ] || git tag -m "v${VERSION}"  ${VERSION}


build:
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
			-e SECRET_KEY="${SECRET_KEY}" \
			-e MONITOR_BIRDER="web|http://localhost:5000" \
			-e ADMINS=sax:123 \
			-v /tmp/~birder:/var/db \
			${RUN_OPTIONS} \
			${DOCKER_IMAGE} \
			${CMD}


release:
	@echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin
	docker tag ${DOCKER_IMAGE_NAME}:${VERSION} ${DOCKER_IMAGE_NAME}:latest
	docker push ${DOCKER_IMAGE_NAME}:latest
	docker push ${DOCKER_IMAGE_NAME}:${VERSION}

run:
	$(MAKE) .run

shell:
	CMD=/bin/sh RUN_OPTIONS=-it $(MAKE) .run


