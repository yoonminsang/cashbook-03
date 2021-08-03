interface RedisOptions {
  host: string;
  port: string;
  password: string;
}

export const redisOptions: RedisOptions = {
  host: process.env.REDIS_HOST || '',
  port: process.env.REDIS_PORT || '',
  password: process.env.REDIS_PASSWORD || '',
};
