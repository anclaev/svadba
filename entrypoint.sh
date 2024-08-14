#!/bin/bash
echo y|npx prisma migrate deploy

HOSTNAME=0.0.0.0 node server.js
