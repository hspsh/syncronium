#!/usr/bin/env bash

source scripts/commons.sh

if [[ ! -z "$KUBECONFIG_DATA" ]]; then
  kubeconf=$(mktemp /tmp/kubeconf.XXXXX)
  echo "$KUBECONFIG_DATA" > $kubeconf
  export KUBECONFIG=$kubeconf
fi

helm upgrade --install --set discordApiKey=$DISCORD_API_KEY --set imageTag=$(guten_tag) -n syncronium --create-namespace syncronium ./helm

if [[ ! -z "$kubeconf" ]]; then
  rm $kubeconf
fi
