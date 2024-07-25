import { DataSource } from "typeorm";
import dotenv from 'dotenv'
import { Movements } from "@/models/Movements";
import { Users } from "@/models/Users";

dotenv.config()

interface IDConfig {
    username: string;
    password: string;
    database: string;
    host: string;
}

interface IConfig {
    dev :IDConfig;
    prod: IDConfig;
}

const config: IConfig = {
    dev: {
        username: process.env.MYSQL_USER!,
        password: process.env.MYSQL_PASSWORD!,
        database: process.env.MYSQL_DB!,
        host: process.env.MYSQL_HOST!,
    },
    prod: {
        username: process.env.DB_USER!,
        password: process.env.DB_USER_PASS!,
        database: process.env.DB_DATABASE!,
        host: process.env.DB_HOST!,
    }
}

const env = process.env.NODE_ENV || 'dev';
const dbConfig = config[env as keyof typeof config];

export const AppDataSource = new DataSource({
    type: "mysql",
    host: dbConfig.host,
    port: parseInt(process.env.MYSQL_PORT as string),
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: true,
    logging: false,
    entities: [Movements, Users],
    subscribers: [],
    migrations: [],
});
