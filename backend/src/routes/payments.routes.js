import express from 'express';
import { createCheckoutSession, handleStripeWebhook } from '../modules/payments/index.js';
import { STRIPE_WEBHOOK_SECRET } from '../config/env.js';
const router = express.Router();

// create checkout (frontend calls this)
router.post('/create-checkout', async (req, res) => {
  const { priceId, email, userId } = req.body;
  const successUrl = `${process.env.VITE_FRONTEND_URL}/billing/success`;
  const cancelUrl = `${process.env.VITE_FRONTEND_URL}/billing/cancel`;
  try {
    const session = await createCheckoutSession({ priceId, email, userId, successUrl, cancelUrl });
    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not create checkout' });
  }
});

// stripe webhook — expects raw body; handled in server.js
router.post('/webhook', async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    const event = await handleStripeWebhook(req.rawBody, sig);
    res.json({ received: true, type: event.type });
  } catch (err) {
    console.error('Webhook error', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

export default router;
