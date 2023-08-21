import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import path from 'path';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: [],
  migrations: [],
  //entities: [path.join(__dirname, 'entities', '*{.ts,.js}')],
  //migrations: [path.join(__dirname, 'migrations', '*{.ts,.js}')],
  //entities: ['src/db/entities/*.entity.{ts,js}'],
  //migrations: ['src/db/migrations/*.{ts,js}'],
  synchronize: true,
  logging: true,
};
