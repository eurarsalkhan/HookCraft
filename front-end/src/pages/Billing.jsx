import React, { useState } from 'react';
import { Api } from '../lib/api';

export default function Billing(){
  const [loading, setLoading] = useState(false);
  const priceId = 'price_XXXXXXXX'; // set real Stripe price id in frontend or request from backend

  async function buy() {
    setLoading(true);
    try {
      const me = JSON.parse(localStorage.getItem('me')) || {};
      const res = await Api.createCheckout({ priceId, email: me.email, userId: me.id });
      window.location.href = res.url; // redirect to Stripe Checkout
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h3 className="text-xl font-bold">Buy Credits</h3>
      <p className="mt-2 text-gray-600">One-time packs or subscription (Stripe checkout).</p>
      <div className="mt-4 flex gap-3">
        <button onClick={buy} className="bg-emerald-600 text-white px-4 py-2 rounded">{loading ? 'Processing...' : 'Buy 100 Credits'}</button>
      </div>
    </div>
  );
}
