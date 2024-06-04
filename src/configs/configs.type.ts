export type Configs = {
  app: AppConfig;
  database: DatabaseConfig;
  sentry: SentryConfig;
  redis: RedisConfig;
  jwt: JWTConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};
export type DatabaseConfig = {
  port: number;
  host: string;
  username: string;
  password: string;
  db_name: string;
};
export type SentryConfig = {
  dsn: string;
  environment: string;
};
export type RedisConfig = {
  port: number;
  host: string;
  password: string;
};
export type JWTConfig = {
  access_secret: string;
  refresh_secret: string;
  access_expires_in: number;
  refresh_expires_in: number;
};
