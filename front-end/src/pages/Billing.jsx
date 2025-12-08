// import React, { useState } from 'react';
// import { Api } from '../lib/api';

// export default function Billing(){
//   const [loading, setLoading] = useState(false);
//   const priceId = 'price_XXXXXXXX'; // set real Stripe price id in frontend or request from backend

//   async function buy() {
//     setLoading(true);
//     try {
//       const me = JSON.parse(localStorage.getItem('me')) || {};
//       const res = await Api.createCheckout({ priceId, email: me.email, userId: me.id });
//       window.location.href = res.url; // redirect to Stripe Checkout
//     } catch (e) {
//       alert(e.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h3 className="text-xl font-bold">Buy Credits</h3>
//       <p className="mt-2 text-gray-600">One-time packs or subscription (Stripe checkout).</p>
//       <div className="mt-4 flex gap-3">
//         <button onClick={buy} className="bg-emerald-600 text-white px-4 py-2 rounded">{loading ? 'Processing...' : 'Buy 100 Credits'}</button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Api } from "../lib/api";

export default function Billing() {
  const [loading, setLoading] = useState(false);

  async function buy() {
    setLoading(true);
    try {
      const me = JSON.parse(localStorage.getItem("me")) || {};

      // Create Razorpay Order
      const order = await Api.createRazorpayOrder({
        amount: 10000, // 100 INR = 10000 paise
        email: me.email,
        userId: me.id,
      });

      // Razorpay options
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: order.amount,
        currency: order.currency,
        name: "Your Business",
        description: "Buy Credits",
        order_id: order.id,
        handler: async (response) => {
          try {
            await Api.verifyRazorpayPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            alert("Payment Successful ✔");
          } catch {
            alert("Payment Validation Failed ❌");
          }
        },
        prefill: { email: me.email },
        theme: { color: "#10B981" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h3 className="text-xl font-bold">Buy Credits</h3>
      <p className="mt-2 text-gray-600">One-time payment through Razorpay.</p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={buy}
          className="bg-emerald-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Processing..." : "Buy 100 Credits"}
        </button>
      </div>
    </div>
  );
}
