interface RedisOptions {
  host: string;
  port: string;
}

export const redisOptions: RedisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || '6379',
};
