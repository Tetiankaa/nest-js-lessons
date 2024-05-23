export type Configs = {
  app: AppConfig;
  database: DatabaseConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};
export type DatabaseConfig = {
  port: number;
  host: string;
};
