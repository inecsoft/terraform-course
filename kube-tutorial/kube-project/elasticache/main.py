import redis


# host.docker.internal
redis = redis.Redis(host='replace_with_redis_cache_endpoint',port='6379')
redis.set('redis_key', 'Hello !!! Fetched value from ElastiCache Redis Cluster.')
value = redis.get('redis_key')

print(value)

redis.zadd('vehicles', {'car' : 0})
redis.zadd('vehicles', {'bike' : 0})
vechicles = redis.zrange('vehicles', 0, -1)

print(vehicles)