// Lightweight auth helpers using Supabase token verification & user upsert
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } from '../../config/env.js';
import { query } from '../../config/db.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY );

export async function getSupabaseUserByToken(token) {
  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) return { error };
    return { user: data.user };
  } catch (err) {
    return { error: err };
  }
}

// Ensure user row exists in users table — called after token validated
export async function ensureLocalUser(user) {
  const id = user.id;
  const email = user.email || null;
  // upsert pattern
  await query(
    `INSERT INTO users (id, email) VALUES ($1, $2)
     ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email`,
    [id, email]
  );
  const { rows } = await query('SELECT id, email, credits, plan FROM users WHERE id=$1', [id]);
  return rows[0];
}
