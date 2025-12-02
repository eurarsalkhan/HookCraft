import pkg from 'pg';
const { Pool } = pkg;
import { DATABASE_URL } from './env.js';

export const pool = new Pool({
  connectionString: DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

export async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  // option: log slow queries
  return res;
}
