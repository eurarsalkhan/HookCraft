import { query } from '../../config/db.js';

export async function getUserById(id) {
  const { rows } = await query('SELECT id, email, credits, plan, total_generations, created_at FROM users WHERE id=$1', [id]);
  return rows[0];
}

export async function addCredits(userId, credits) {
  const res = await query('UPDATE users SET credits = credits + $1 WHERE id=$2 RETURNING credits', [credits, userId]);
  return res.rows[0];
}
