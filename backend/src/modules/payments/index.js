// Stripe helper wrappers for checkout creation and webhook processing
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '../../config/env.js';
import { query } from '../../config/db.js';

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

export async function createCheckoutSession({ priceId, email, userId, successUrl, cancelUrl }) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: email,
    metadata: { userId }
  });
  return session;
}

export async function handleStripeWebhook(rawBody, sig) {
  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    throw err;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    const amount = session.amount_total || 0;
    // Map amount to credits (business rule)
    const creditsToAdd = Math.max(1, Math.round(amount / 49)); // Example

    if (userId) {
      await query('UPDATE users SET credits = credits + $1 WHERE id=$2', [creditsToAdd, userId]);
      await query('INSERT INTO payments (user_id, stripe_session_id, amount, credits_added, status) VALUES ($1,$2,$3,$4,$5)', [userId, session.id, amount, creditsToAdd, 'completed']);
    }
  }

  return event;
}
