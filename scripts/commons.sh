#!/usr/bin/env bash

function guten_tag(){
    echo `git rev-parse --short HEAD`
}


export IMAGE_TAG="${IMAGE_TAG:-$(guten_tag)}"
export DATA_DIR="${DATA_DIR:-~/syncronium}"
export REPO_NAME="${DOCKER_REPO:-ksidelta}"

export -f guten_tag
