#!/usr/bin/env bash
set -e

source scripts/commons.sh

if [[ -n "$KUBECONFIG_DATA" ]]; then
  kubeconf=$(mktemp /tmp/kubeconf.XXXXX)
  echo "$KUBECONFIG_DATA" > $kubeconf
  export KUBECONFIG=$kubeconf
fi

helm upgrade --install --set discordGroup=$DISCORD_GROUP --set discordApiKey=$DISCORD_API_KEY --set imageTag=$(guten_tag) -n $K8S_NAMESPACE --create-namespace $K8S_NAMESPACE ./helm

if [[ -n "$kubeconf" ]]; then
  rm $kubeconf
fi
