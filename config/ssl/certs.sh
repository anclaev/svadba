#!/bin/bash
yarn mkcert create-ca --key config/ssl/ca.key --cert config/ssl/ca.crt
yarn mkcert create-cert --ca-key config/ssl/ca.key --ca-cert config/ssl/ca.crt \
    --key apps/bot/src/certs/localhost.key --cert apps/bot/src/certs/localhost.crt