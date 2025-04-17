#!/bin/bash

if [ "$1" = "logs" ]; then
    docker compose -f ./deployment/test/docker-compose.yml -p svadba-test up \
        --exit-code-from playwright-runner
else
    docker compose -f ./deployment/test/docker-compose.yml -p svadba-test up \
        --attach playwright-runner \
        --exit-code-from playwright-runner
fi