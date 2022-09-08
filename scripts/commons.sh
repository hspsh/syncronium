#!/usr/bin/env bash

function guten_tag(){
    git describe --tags --abbrev=0 --exact-match HEAD 2>/dev/null \
      || git rev-parse --short HEAD
}

export IMAGE_TAG="${IMAGE_TAG:-$(guten_tag)}"
export DATA_DIR="${DATA_DIR:-~/syncronium}"
export REPO_NAME="${DOCKER_REPO:-ksidelta}"
export DISCORD_GROUP="${DISCORD_GROUP:-621300560481615892}"

export -f guten_tag
