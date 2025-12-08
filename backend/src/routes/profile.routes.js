import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/me', requireAuth, async (req, res) => {
  try {
    res.json({
      id: req.user.id,
      email: req.user.email
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
