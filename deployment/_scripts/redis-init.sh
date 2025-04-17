#!/bin/bash

mkdir -p /usr/e2e/etc/redis
echo "bind 0.0.0.0" > /usr/e2e/etc/redis/redis.conf
echo "requirepass ${REDIS_PASSWORD}" >> /usr/e2e/etc/redis/redis.conf
echo "appendonly yes" >> /usr/e2e/etc/redis/redis.conf
echo "appendfsync everysec" >> /usr/e2e/etc/redis/redis.conf
echo "user default on nopass ~* +@all" > /usr/e2e/etc/redis/users.acl
echo "user ${REDIS_USER} on >${REDIS_PASSWORD} ~* +@all" >> /usr/e2e/etc/redis/users.acl
redis-server /usr/e2e/etc/redis/redis.conf --aclfile /usr/e2e/etc/redis/users.acl