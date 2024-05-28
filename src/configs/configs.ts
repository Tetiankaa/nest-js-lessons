import * as process from 'node:process';

import * as dotenv from 'dotenv';

import { Configs } from './configs.type';

dotenv.config({ path: './environments/local.env' });
export default (): Configs => ({
  app: {
    port: parseInt(process.env.APP_PORT) || 3000,
    host: process.env.APP_HOST || '0.0.0.0',
  },
  database: {
    port: parseInt(process.env.POSTGRES_PORT),
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    db_name: process.env.POSTGRES_DB,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT,
  },
});
