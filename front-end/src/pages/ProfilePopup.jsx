import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, Link } from "react-router-dom";

export default function ProfilePopup({ close }) {
  const [me, setMe] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  // Load profile on mount
  useEffect(() => {
    loadProfile();
  }, []);

 async function loadProfile() {
  try {
    // 1. Get supabase session token
    const { data: session } = await supabase.auth.getSession();
    const token = session?.session?.access_token;

    if (!token) return;

    // 2. Call backend profile route
    const res = await fetch(`${import.meta.env.VITE_API}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Backend error:", res.status);
      return;
    }

    const meData = await res.json();

    // 3. Update state
    setMe(meData);
  } catch (err) {
    console.error("loadProfile error:", err);
  }
}



  // Close popup on outside click
  useEffect(() => {
    function handleOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [close]);

  // Logout + auto-close popup
  const handleLogout = async () => {
    await supabase.auth.signOut();
    close();                // 🔥 popup closes instantly
    navigate("/login", { replace: true });     // 🔥 redirect to login
  };

  if (!me)
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center text-white">
        Loading...
      </div>
    );
{showSettings && (
  <SettingsPopup
    close={() => setShowSettings(false)}
    save={(val) => {
      localStorage.setItem("hook_settings", JSON.stringify(val));
      setShowSettings(false);
    }}
  />
)}


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm z-50">
      <div
        ref={menuRef}
        className="bg-white rounded-2xl shadow-xl w-80 p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 text-black text-xl font-bold"
        >
          ✕
        </button>

        {/* Avatar */}
        <div className="w-16 h-16 mx-auto rounded-full bg-[#0a1a33] text-white flex items-center justify-center text-2xl font-bold">
        {me?.email?.charAt(0)?.toUpperCase() || "U"}
        </div>

        {/* Info */}
        <div className="text-center mt-3 text-black">
          <h3 className="font-bold text-lg">{me.username || "User"}</h3>
          <p className="text-gray-600">{me.email}</p>
        </div>

        {/* Plan + Credits */}
        <div className="mt-4 bg-gray-100 p-3 rounded-lg text-black">
          <div className="flex justify-between">
            <span>Plan:</span>
            <strong>{me?.plan ?? " "}</strong>
          </div>
          <div className="flex justify-between mt-1">
            <span>Credits:</span>
            <strong>{me?.credits ?? 0}</strong>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-5 space-y-2">
          <Link
            to="/pricing"
            className="block bg-[#0a1a33] text-white py-2 rounded-lg text-center hover:bg-[#0c234d] transition"
            onClick={close}
          >
            Upgrade
          </Link>

          <Link
            to="/setting"
            className="block border py-2 rounded-lg text-black text-center hover:bg-gray-100 transition"
            onClick={close}
          >
            Settings
          </Link>

          <Link
            to="/contact"
            className="block border py-2 rounded-lg text-black text-center hover:bg-gray-100 transition"
            onClick={close}
          >
            Help
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
