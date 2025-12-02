import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProtectedRoute({ children, user, adminOnly = false  }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
   if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;

  // 1️⃣ Fresh session check
  useEffect(() => {
    async function check() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    }
    check();

    // Listener (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // 2️⃣ BLOCK: Chrome forward/back caching (MOST IMPORTANT)
  useEffect(() => {
    window.history.scrollRestoration = "manual";

    window.onpageshow = (event) => {
      if (event.persisted) {
        window.location.reload(); // forces fresh auth check
      }
    };
  }, []);

  if (loading) return null;

  // 3️⃣ If NOT logged in → redirect ALWAYS
  if (!session) return <Navigate to="/login" replace />;

  return children;
}
