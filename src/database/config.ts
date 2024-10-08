import { DataSource } from "typeorm";
import dotenv from 'dotenv'
import { Movements } from "@/models/Movements";
import { Users } from "@/models/Users";
import { envVariables } from "@/env";

dotenv.config()

interface IDConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number
}

interface IConfig {
    dev: IDConfig;
    test: IDConfig;
    prod: IDConfig;
}

const config: IConfig = {
    dev: {
        username: envVariables.PG_USER,
        password: envVariables.PG_PASSWORD!,
        database: envVariables.PG_DB!,
        host: envVariables.PG_HOST!,
        port:envVariables.PG_PORT!,
    },

    test: {
        username: process.env.PG_USER_TEST!,
        password: process.env.PG_PASSWORD_TEST!,
        database: process.env.PG_DB_TEST!,
        host: process.env.PG_HOST_TEST!,
        port: parseInt(process.env.PG_PORT_TEST!),
    },
    prod: {
        username: envVariables.PG_USER!,
        password: envVariables.PG_PASSWORD!,
        database: envVariables.PG_DB!,
        host: envVariables.PG_HOST!,
        port: envVariables.PG_PORT!,
    }
}

const env = process.env.NODE_ENV;
const dbConfig = config[env as keyof typeof config];

export const AppDataSource = new DataSource({
    type: "postgres",
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: false,
    logging: false,
    entities: [Movements, Users],
    subscribers: [],
    migrations: [],
    ssl: {
        rejectUnauthorized: false, 
    },
    extra: {
        idleTimeoutMillis: 0,
        connectionTimeoutMillis: 0,
    }
});




