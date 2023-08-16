import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import path from "path";

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'postgres', //process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: 'mydatabase',
  username: 'myuser', //process.env.DB_USERNAME, //'myuser',
  password: 'myuserpassword',//process.env.DB_PASSWORD, //'myuserpassword', //,
  entities: [],
  migrations: [],
  //entities: [path.join(__dirname, 'entities', '*{.ts,.js}')],
  //migrations: [path.join(__dirname, 'migrations', '*{.ts,.js}')],
  //entities: ['src/db/entities/*.entity.{ts,js}'],
  //migrations: ['src/db/migrations/*.{ts,js}'],
  synchronize: true,
  logging: true,
};
