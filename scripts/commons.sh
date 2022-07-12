#!/usr/bin/env bash

function guten_tag(){
    echo `git rev-parse --short HEAD`
}

export -f guten_tag
