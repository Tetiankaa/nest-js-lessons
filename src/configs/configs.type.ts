export type Configs = {
  app: AppConfig;
  database: DatabaseConfig;
  sentry: SentryConfig;
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
