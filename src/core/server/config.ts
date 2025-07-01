import dotenv from "dotenv";

type TConfig = { 
    port: number | string, 
    env: string,
    db: { [k: string]: string }
};

dotenv.config();

export const config: TConfig = {
    port: process.env.PORT ?? 4000,
    env: process.env.NODE_ENV ?? "development",
    db: { url: process.env.DATABASE_URL ?? "file:./data.db" }
};