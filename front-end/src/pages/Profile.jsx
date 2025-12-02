// AdvancedProfilePage.jsx
// React single-file component (default export)
// Tailwind CSS required. Framer Motion optional but used for subtle animations.
// How to use:
// 1. Create a React app (Vite or CRA) and enable Tailwind CSS.
// 2. Drop this file into src/components and import <AdvancedProfilePage /> in your App.
// 3. The component stores profile locally (localStorage) and simulates a "Buy Credits" flow.
//
// Notes about the user's spec (interpreted):
// - Mutable by user (directly editable): profile image (upload), email, phone number, username.
// - Credit is immutable for direct edit (read-only) but *updates* when user completes a "Buy Credits" action via the Buy Credits dialog/button.
// - The "Buy Credits" control is always present (immutable placement), but the credit value changes only through that flow.

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";


const STORAGE_KEY = "advanced_profile_v1";

const defaultProfile = {
  username: "NewUser",
  email: "user@example.com",
  phone: "+91-9000000000",
  avatar: "", // dataURL or external link
  credits: 120, // read-only input, only changed by Buy Credits
};

export default function AdvancedProfilePage() {
  const [profile, setProfile] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : defaultProfile;
    } catch (e) {
      return defaultProfile;
    }
  });

  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(profile);
  const [showBuy, setShowBuy] = useState(false);
  const fileRef = useRef(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setTemp((t) => ({ ...t, [name]: value }));
  }

  function handleAvatarFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setTemp((t) => ({ ...t, avatar: ev.target.result }));
    reader.readAsDataURL(file);
  }

  function startEdit() {
    setTemp(profile);
    setEditing(true);
  }

  function cancelEdit() {
    setTemp(profile);
    setEditing(false);
  }

  function saveProfile() {
    // Basic validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(temp.email)) {
      setToast({ type: "error", message: "Enter a valid email" });
      return;
    }
    if (!/^\+?[0-9\- ]{7,20}$/.test(temp.phone)) {
      setToast({ type: "error", message: "Enter a valid phone" });
      return;
    }
    setProfile((p) => ({ ...p, username: temp.username, email: temp.email, phone: temp.phone, avatar: temp.avatar }));
    setEditing(false);
    setToast({ type: "success", message: "Profile saved" });
  }

  function triggerFileSelect() {
    fileRef.current?.click();
  }

  function openBuyModal() {
    setShowBuy(true);
  }

  function completePurchase(amount) {
    if (amount <= 0) return setToast({ type: "error", message: "Enter a positive amount" });
    // Simulate payment success
    setProfile((p) => ({ ...p, credits: p.credits + Math.floor(amount) }));
    setShowBuy(false);
    setToast({ type: "success", message: `Purchased ${Math.floor(amount)} credits` });
  }

  return (
    <div className="max-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column: profile card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="col-span-1 bg-white/6 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/6"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className="w-28 h-28 rounded-full overflow-hidden ring-2 ring-white/10 shadow-inner hover:scale-105 transition-transform duration-300"
                style={{ background: "linear-gradient(135deg,#0ea5e9, #7c3aed)" }}
              >
                {temp.avatar || profile.avatar ? (
                  <img src={editing ? temp.avatar || profile.avatar : profile.avatar || temp.avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-bold">{(profile.username || temp.username || "U").charAt(0).toUpperCase()}</div>
                )}
              </div>

              {editing && (
                <button
                  onClick={triggerFileSelect}
                  className="absolute -bottom-2 -right-2 bg-white/10 backdrop-blur-sm p-2 rounded-full border border-white/10 hover:scale-105 transition-transform"
                  title="Change avatar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M9 11l3 3L20.5 5.5a2.121 2.121 0 00-3-3L9 11z" />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-white">{profile.username}</h2>
              <p className="text-sm text-slate-300 mt-1">{profile.email}</p>
              <p className="text-sm text-slate-300 mt-1">{profile.phone}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-white/4">
              <div className="text-xs text-slate-300">Credits</div>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-bold text-white">{profile.credits}</div>
                <div className="text-xs text-slate-300">(read-only — top-up using Buy)</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/4 flex flex-col justify-between">
              <div>
                <div className="text-xs text-slate-300">Member since</div>
                <div className="text-sm text-white mt-1">{new Date().toLocaleDateString()}</div>
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={openBuyModal} className="ml-auto px-3 py-1 rounded-md bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-semibold shadow hover:scale-105 transition-transform">
                  Buy Credits
                </button>
                <button onClick={() => (editing ? saveProfile() : startEdit())} className="px-3 py-1 rounded-md border border-white/10 text-white/90 hover:bg-white/6 transition">
                  {editing ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm text-slate-300">About</h3>
            <p className="text-xs text-slate-200 mt-2">A compact pro-level profile card with subtle glassmorphism, micro-interactions, and a secure buy-flow for credits. Profile data persists locally for demo purposes.</p>
          </div>

          {editing && (
            <div className="mt-4 grid grid-cols-1 gap-3">
              <input type="text" name="username" value={temp.username} onChange={handleInputChange} className="input-style" placeholder="Username" />
              <input type="email" name="email" value={temp.email} onChange={handleInputChange} className="input-style" placeholder="Email" />
              <input type="text" name="phone" value={temp.phone} onChange={handleInputChange} className="input-style" placeholder="Phone" />

              <div className="flex gap-2 mt-2">
                <button onClick={saveProfile} className="px-3 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold">Save</button>
                <button onClick={cancelEdit} className="px-3 py-2 rounded-md bg-white/6 border border-white/10 text-white">Cancel</button>
              </div>

              <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={(e) => handleAvatarFile(e.target.files?.[0])} />
            </div>
          )}
        </motion.div>

        {/* Right column: details & actions (span 2 columns on md) */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="col-span-1 md:col-span-2 bg-white/5 rounded-2xl p-6 shadow-lg border border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Account & Activity</h3>
              <p className="text-sm text-slate-300">Manage your profile details and top-up credits. Animations and accessibility considered.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-2 rounded-lg bg-white/6 text-slate-200 text-sm">Plan: Pro</div>
              <div className="px-3 py-2 rounded-lg bg-white/6 text-slate-200 text-sm">ID: #{Math.abs(hashCode(profile.email)).toString().slice(0,6)}</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/6 rounded-xl">
              <h4 className="text-sm text-slate-300">Contact</h4>
              <div className="mt-3 text-white font-medium">{profile.email}</div>
              <div className="text-slate-300 text-sm mt-1">{profile.phone}</div>
            </div>

            <div className="p-4 bg-white/6 rounded-xl">
              <h4 className="text-sm text-slate-300">Security</h4>
              <div className="mt-3 text-white text-sm">Two-factor: <span className="ml-2 font-semibold">Enabled</span></div>
              <div className="mt-3 text-slate-300 text-xs">Last login: {new Date().toLocaleString()}</div>
            </div>

            <div className="p-4 md:col-span-2 bg-gradient-to-r from-violet-800/40 to-sky-700/30 rounded-xl border border-white/6 relative overflow-hidden">
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 grid md:grid-cols-3 gap-4 items-center">
                <div>
                  <div className="text-xs text-slate-300">Available Credits</div>
                  <div className="text-3xl font-bold text-white">{profile.credits}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-300">Next Reward</div>
                  <div className="text-sm text-white">Reach 500 credits to unlock Pro Badge</div>
                </div>
                <div className="ml-auto flex gap-3">
                  <button onClick={() => { setToast({ type: 'info', message: 'Feature: View purchase history (placeholder)' }); }} className="px-3 py-1 rounded-md bg-white/6 border border-white/10 text-white">Purchase History</button>
                  <button onClick={openBuyModal} className="px-3 py-1 rounded-md bg-clip-padding backdrop-blur-sm bg-white/8 border border-white/10 text-white font-semibold">Buy More</button>
                </div>
              </motion.div>

              {/* decorative animated dots */}
              <svg className="absolute -right-8 -bottom-8 opacity-20" width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="110" cy="110" r="110" fill="url(#g)" />
                <defs>
                  <radialGradient id="g" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(110 110) rotate(90) scale(110)">
                    <stop stopColor="#7c3aed" stopOpacity="0.75" />
                    <stop offset="1" stopColor="#0ea5e9" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm text-slate-300">Recent Activity (mock)</h4>
            <ul className="mt-3 space-y-2">
              <li className="p-3 bg-white/4 rounded-md flex justify-between items-center">
                <div>
                  <div className="text-sm text-white">Bought 50 credits</div>
                  <div className="text-xs text-slate-300">2 days ago</div>
                </div>
                <div className="text-sm text-slate-200">+50</div>
              </li>
              <li className="p-3 bg-white/4 rounded-md flex justify-between items-center">
                <div>
                  <div className="text-sm text-white">Updated profile</div>
                  <div className="text-xs text-slate-300">1 week ago</div>
                </div>
                <div className="text-sm text-slate-200">—</div>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Buy modal */}
      <AnimatePresence>
        {showBuy && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowBuy(false)} />
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }} transition={{ type: "spring", damping: 18 }} className="relative bg-slate-900 rounded-2xl p-6 w-full max-w-md z-60 border border-white/6">
              <h3 className="text-lg text-white font-semibold">Buy Credits</h3>
              <p className="text-sm text-slate-300 mt-2">Enter an amount to purchase credits. This demo simulates success and adds credits to your account.</p>

              <BuyForm onComplete={completePurchase} onCancel={() => setShowBuy(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className={`fixed right-6 bottom-6 z-50 p-3 rounded-md shadow-lg ${toast.type === 'error' ? 'bg-red-600 text-white' : toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-white'}`}>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BuyForm({ onComplete, onCancel }) {
  const [amount, setAmount] = useState(50);
  const [loading, setLoading] = useState(false);

  function submit(e) {
    e.preventDefault();
    setLoading(true);
    // simulate payment delay
    setTimeout(() => {
      setLoading(false);
      onComplete(amount);
    }, 900);
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3">
      <label className="block text-sm text-slate-300">Amount</label>
      <input type="number" min="1" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full rounded-md p-2 bg-white/5 border border-white/6 text-white" />
      <div className="flex gap-3 justify-end">
        <button type="button" onClick={onCancel} className="px-3 py-2 rounded-md bg-white/6 border border-white/10 text-white">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 rounded-md bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-semibold">{loading ? 'Processing...' : 'Pay'}</button>
      </div>
    </form>
  );
}

// small utility for ID
function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/*
Tailwind helper: add this to your global CSS so "input-style" class works, or copy these classes inline.

.input-style {
  @apply w-full rounded-md p-2 bg-white/6 border border-white/10 text-white;
}

If your setup doesn't support @apply in component-level styles, replace className="input-style" with:
className="w-full rounded-md p-2 bg-white/6 border border-white/10 text-white"

Dependencies:
- react
- framer-motion (optional but used) -> npm i framer-motion
- tailwindcss configured

This component intentionally keeps credit as a read-only visual field (not directly typed by user) but allows credits to change only via the Buy Credits flow (meets both immutable + dynamic requirements).
*/
