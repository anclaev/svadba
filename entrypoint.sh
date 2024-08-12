#!/bin/bash
yarn prisma migrate deploy
HOSTNAME=0.0.0.0 node server.js
