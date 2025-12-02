import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fetch from 'node-fetch';
import Stripe from 'stripe';
import { Pool } from 'pg';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.SUPABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ------------------- JWT Middleware -------------------
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
        console.log('[Auth] Token received:', token);

  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// ------------------- Auth Routes -------------------
app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashed]
    );
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ error: 'User already exists or invalid input' });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user) return res.status(400).json({ error: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user.id, email: user.email } });
});

// ------------------- User Routes -------------------
app.get('/users/me', authMiddleware, async (req, res) => {
  const result = await pool.query('SELECT id, email FROM users WHERE id = $1', [req.user.id]);
  res.json(result.rows[0]);
});

app.get('/users/me/history', authMiddleware, async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM history WHERE user_id = $1 ORDER BY created_at DESC',
    [req.user.id]
  );
  res.json(result.rows);
});

// ------------------- Generate Route -------------------
app.post('/generate', authMiddleware, async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 150
      })
    });
    const data = await response.json();
    const generatedText = data.choices?.[0]?.text || '';

    // Save to history
    await pool.query(
      'INSERT INTO history (user_id, prompt, result) VALUES ($1, $2, $3)',
      [req.user.id, prompt, generatedText]
    );

    res.json({ result: generatedText });
  } catch (err) {
    res.status(500).json({ error: 'OpenAI API error', details: err.message });
  }
});

// ------------------- Payments Route -------------------
app.post('/payments/create-checkout', authMiddleware, async (req, res) => {
  const { priceId } = req.body;
  if (!priceId) return res.status(400).json({ error: 'Price ID is required' });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      customer_email: req.user.email
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: 'Stripe error', details: err.message });
  }
});

// ------------------- Start Server -------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
