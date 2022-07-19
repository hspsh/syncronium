#!/usr/bin/env bash

source scripts/commons.sh

helm upgrade --install --set discordApiKey=$DISCORD_API_KEY --set imageTag=$(guten_tag) -n syncronium --create-namespace syncronium ./helm
