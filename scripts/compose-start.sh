#!/usr/bin/env bash

source ./scripts/commons.sh

export IMAGE_TAG="${IMAGE_TAG:-$(guten_tag)}"
export DATA_DIR="${DATA_DIR:-~/syncronium}"
export REPO_NAME="${DOCKER_REPO:-ksidelta}"

docker-compose up -d
