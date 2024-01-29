import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url: String(process.env.SQLITE_DATABASE) ?? './src/users.db'
    },
} satisfies Config;
