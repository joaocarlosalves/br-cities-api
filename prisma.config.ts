import "dotenv/config";
import type { PrismaConfig } from "prisma";

export default {
    earlyAccess: true
} satisfies PrismaConfig


/* 

import type { PrismaConfig } from "prisma"

export default {
    earlyAccess: true,
    studio: {
        adapter: async (env: Env) => {
            const { PrismaLibSQL } = await import("@prisma/adapter-libsql");
            const { createClient } = await import("@libsql/client");
            const libsql = createClient({ url: env.DOTENV_PRISMA_STUDIO_LIBSQL_DATABASE_URL });

            return new PrismaLibSQL(libsql);
        }
    }
} satisfies PrismaConfig
 
*/