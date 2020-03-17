import redis from 'redis';

/** @type {import('redis').RedisClient | undefined} */
export let client;

/**
 * Connect to the instant DB
 * @param {Function} cb
 */
export function connect(cb) {
  const _client = redis.createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
  });
  _client.on('ready', ()=>{
    client = _client;
    cb();
  });
  _client.on('error', (err)=>{
    cb(err);
  });
}
