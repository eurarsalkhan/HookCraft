import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { getUserById } from '../modules/users/index.js';

const router = express.Router();

router.get('/me', requireAuth, async (req, res) => {
  const user = await getUserById(req.user.id);
  res.json(user);
});

export default router;
