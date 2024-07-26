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
    port: string
}

interface IConfig {
    dev :IDConfig;
    test: IDConfig;
    prod: IDConfig;
}

const config: IConfig = {
    dev: {
        username: process.env.MYSQL_USER!,
        password: process.env.MYSQL_PASSWORD!,
        database: process.env.MYSQL_DB!,
        host: process.env.MYSQL_HOST!,
        port: process.env.MYSQL_PORT!,
    },

    test: {
        username: process.env.MYSQL_USER_TEST!,
        password: process.env.MYSQL_PASSWORD_TEST!,
        database: process.env.MYSQL_DB_TEST!,
        host: process.env.MYSQL_HOST_TEST!,
        port: process.env.MYSQL_PORT_TEST!,
    },
    prod: {
        username: process.env.DB_USER!,
        password: process.env.DB_USER_PASS!,
        database: process.env.DB_DATABASE!,
        host: process.env.DB_HOST!,
        port: process.env.MYSQL_PORT!,
    }
}

const env = process.env.NODE_ENV;
const dbConfig = config[env as keyof typeof config];

export const AppDataSource = new DataSource({
    type: "mysql",
    host: dbConfig.host,
    port: parseInt(dbConfig.port),
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: true,
    logging: false,
    entities: [Movements, Users],
    subscribers: [],
    migrations: [],
});




