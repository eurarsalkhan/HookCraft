import rateLimit from 'express-rate-limit';
import { RATE_LIMIT_MAX } from '../config/env.js';

export const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, slow down'
});
