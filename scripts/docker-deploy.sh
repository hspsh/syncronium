#!/usr/bin/env bash

source ./scripts/commons.sh

docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}
docker push ${DOCKER_REPO}/syncronium:$(guten_tag) 
