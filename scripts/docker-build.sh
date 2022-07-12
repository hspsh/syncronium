#!/usr/bin/env bash

source scripts/commons.sh

docker build --build-arg NODE_VERSION=$(cat .nvmrc) -t ${DOCKER_REPO}/syncronium:$(guten_tag) .
