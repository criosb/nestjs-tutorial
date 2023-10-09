import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: '',
  port: 0,
  username: '',
  password: '',
  database: '',
  entities: ['/../**/**/*.entity{.ts,.js}'],
  migrations: ['/../../migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDS = new DataSource(DataSourceConfig);
