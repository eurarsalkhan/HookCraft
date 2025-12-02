// import { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabaseClient';

// export function useAuth() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const session = supabase.auth.getSession().then(({ data }) => {
//       const u = data?.session?.user || null;
//       if (u) {
//         const token = data.session.access_token;
//         localStorage.setItem('sb_token', token);
//         setUser(u);
//       }
//       setLoading(false);
//     }).catch(() => setLoading(false));

//     const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
//       if (session?.access_token) {
//         localStorage.setItem('sb_token', session.access_token);
//         setUser(session.user);
//       } else {
//         localStorage.removeItem('sb_token');
//         setUser(null);
//       }
//     });

//     return () => listener.subscription.unsubscribe();
//   }, []);

//   return { user, loading };
// }
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      const { data } = await supabase.auth.getSession();
      const u = data?.session?.user || null;

      if (u) {
        const role = u.email === "hookcraft9356@gmail.com" ? "admin" : "user";
        setUser({ ...u, role });
        localStorage.setItem("sb_token", data.session.access_token);
      }
      setLoading(false);
    }

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const role = session.user.email === "hookcraft9356@gmail.com" ? "admin" : "user";
        setUser({ ...session.user, role });
        localStorage.setItem("sb_token", session.access_token);
      } else {
        setUser(null);
        localStorage.removeItem("sb_token");
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return { user, loading };
}
