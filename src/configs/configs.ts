import * as process from 'node:process';

export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT) || 3000,
    host: process.env.APP_HOST || '0.0.0.0',
  },
  database: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
  },
});
