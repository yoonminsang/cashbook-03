interface DatabaseOptions {
  host: string;
  name: string;
  user: string;
  password: string;
}

export const dbOptions: DatabaseOptions = {
  host: process.env.DB_HOST || 'localhost',
  name: process.env.DB_NAME || 'database',
  user: process.env.DB_USER || 'username',
  password: process.env.DB_PASSWORD || 'password',
};
