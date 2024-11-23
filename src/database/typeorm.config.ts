import {DataSource, DataSourceOptions} from "typeorm";
import * as process from "node:process";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'typeorm',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../database/migrations/*.{js,ts}'],
    synchronize: true,
    logging: true,
};

export const AppDataSource = new DataSource(dataSourceOptions)