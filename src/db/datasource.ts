import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'postgres', //process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: 'mydatabase',
  username: 'myuser',
  password: 'myuserpassword', // process.env.DB_PASSWORD,
  migrations: [],
  synchronize: true,
  logging: true,
};
