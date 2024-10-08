import "dotenv/config";
import { z } from "zod";
import dotenv from "dotenv"

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'prod']),
    PORT: z.coerce.number().default(3003),
    JWT_SECRET_KEY: z.string(),
    PG_HOST: z.string(),
    PG_USER: z.string(),
    PG_DB: z.string(),
    PG_PASSWORD: z.string()
});

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error("❌ Invalid enviroment variable", _env.error.format());

    throw new Error("Invalid enviroment variables");
}

export const envVariables = _env.data;

