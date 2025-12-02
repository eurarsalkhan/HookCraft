import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { z } from 'zod';
import { generateHooksForUser } from '../modules/hooks/index.js';

const router = express.Router();

// const Schema = z.object({
//   niche: z.string().min(1).max(64),
//   topic: z.string().min(1).max(200),
//   tone: z.string().min(1).max(32),
//   audience: z.string().max(64).optional().or(z.literal('')),
//   hookType: z.string().max(32).optional().or(z.literal('')),
//   length: z.enum(['Short', 'Medium']).optional(),
//   count: z.number().int().min(1).max(15).optional()
// });
const Schema = z.object({
  niche: z.string().min(1).max(64),
  topic: z.string().min(1).max(200),
  tone: z.string().min(1).max(32),
  audience: z.string().max(64).optional().or(z.literal('')),
  hookType: z.string().max(32).optional().or(z.literal('')),
  length: z.enum(['Short', 'Medium']).optional(),
  count: z.number().int().min(1).max(15).optional(),

  // new fields
  genre: z.string().max(32).optional().or(z.literal('')),
  conflict: z.string().max(32).optional().or(z.literal('')),
  language: z.string().max(32).optional().or(z.literal('')),
  reaction: z.string().max(32).optional().or(z.literal('')),
  type: z.string().max(32).optional().or(z.literal('')),
});

router.post('/', requireAuth, validateBody(Schema), async (req, res, next) => {
  try {
    const userId = req.user.id;
    const input = req.validated;
    const result = await generateHooksForUser(userId, input);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
