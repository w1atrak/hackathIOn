import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';

import * as schema from './schema';

const connectionString = process.env.POSTGRES_URL;
if (!connectionString) {
  throw new Error('Missing POSTGRES_URL environment variable');
}

export const db = drizzle(sql, { schema });
