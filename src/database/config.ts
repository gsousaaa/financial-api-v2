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




