#!/usr/bin/env bash

function guten_tag(){
    echo `git rev-parse --short HEAD`
}

export IMAGE_TAG="${IMAGE_TAG:-$(guten_tag)}"
export DATA_DIR="${DATA_DIR:-~/syncronium}"
export REPO_NAME="${DOCKER_REPO:-ksidelta}"
export DISCORD_GROUP="${DISCORD_GROUP:-621300560481615892}"
export K8S_NAMESPACE="${K8S_NAMESPACE:-syncronium}"

export -f guten_tag
