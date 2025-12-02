// Simple DB-backed cache
import { query } from '../config/db.js';
import { CACHE_TTL_SECONDS } from '../config/env.js';

export async function getCached(hash) {
  const { rows } = await query('SELECT output, created_at FROM cache WHERE input_hash=$1', [hash]);
  if (!rows.length) return null;
  const row = rows[0];
  const age = (Date.now() - new Date(row.created_at).getTime()) / 1000;
  if (age > CACHE_TTL_SECONDS) {
    await query('DELETE FROM cache WHERE input_hash=$1', [hash]);
    return null;
  }
  return row.output;
}

export async function setCache(hash, output) {
  await query('INSERT INTO cache (input_hash, output, created_at) VALUES ($1, $2, now()) ON CONFLICT (input_hash) DO UPDATE SET output = EXCLUDED.output, created_at = EXCLUDED.created_at', [hash, output]);
}
