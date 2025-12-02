import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { query } from '../config/db.js';

const router = express.Router();

// NOTE: Protect with admin check in production (role in user row or separate admin token)
router.get('/stats', requireAuth, async (req, res) => {
  
  // simple admin guard (replace with real role check)
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });

  const users = await query('SELECT COUNT(*) AS total_users FROM users');
  const gens = await query('SELECT COUNT(*) AS total_generations FROM generations');
  const revenue = await query("SELECT COALESCE(SUM(amount),0) AS revenue FROM payments WHERE status='completed'");
  res.json({
    total_users: parseInt(users.rows[0].total_users, 10),
    total_generations: parseInt(gens.rows[0].total_generations, 10),
    revenue: parseInt(revenue.rows[0].revenue, 10)
  });
});

export default router;
