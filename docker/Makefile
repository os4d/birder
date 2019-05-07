DEVELOP?=0
DOCKER_PASS?=
DOCKER_USER?=
VERSION?=0.14.0
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


build:
	cd .. && python setup.py sdist --dist-dir docker
	cd .. && docker build \
			${BUILD_OPTIONS} \
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
			-e MONITORa_BIRDER=http://localhost:5000 \
			-e MONITORb_DB=postgis://postgres:@192.168.66.66:6379/aaa \
			-e ADMINS=sax:123 \
			-v /tmp/~birder:/var/db \
			${RUN_OPTIONS} \
			${DOCKER_IMAGE} \
			${CMD}

local:
	RUN_OPTIONS="-v ${PWD}/..:/code -e PYTHONPATH=/code -it" \
	CMD="/bin/bash" \
	$(MAKE) .run

release:
	pass docker/saxix | docker login -u saxix --password-stdin
	docker tag ${DOCKER_IMAGE_NAME}:${VERSION} ${DOCKER_IMAGE_NAME}:latest
	docker push ${DOCKER_IMAGE_NAME}:${VERSION}
	docker push ${DOCKER_IMAGE_NAME}:latest

deploy:
	lazo rancher --insecure upgrade bitcaster:sm os4d/birder:latest
#	$(MAKE) bump

run:
	$(MAKE) .run

shell:
	CMD=/bin/sh RUN_OPTIONS=-it $(MAKE) .run


