import 'dotenv/config';
import type { Config } from 'drizzle-kit';
// import { dbPath } from './test';

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url: './users.db'
    },
} satisfies Config;


