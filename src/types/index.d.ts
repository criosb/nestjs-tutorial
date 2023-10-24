declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    HASH_SALT: number;
  }
}
