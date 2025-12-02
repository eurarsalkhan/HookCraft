
import React, { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";
import Loader from "../components/Loader";
import { supabase } from '../lib/supabaseClient';


export default function Account() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      // 1) FETCH LOGGED-IN USER
      const { data: authData } = await supabase.auth.getUser();
      const user = authData?.user;

      if (!user) {
        setMe(null);
        return setLoading(false);
      }

      // 2) FETCH PROFILE FROM SUPABASE
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setMe({
        email: user.email,
        ...profile,
      });

    } catch (e) {
      console.log("Error loading user:", e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />;

  if (!me) {
    return (
      <div className="text-center mt-10 text-red-500">
        User not logged in.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold">Account</h3>

        <div className="mt-3 space-y-2">
          <div>Email: <strong>{me.email}</strong></div>
          <div>Plan: <strong>{me.plan || "free"}</strong></div>
          <div>Credits: <strong>{me.credits ?? 0}</strong></div>
          <div>Total Generations: <strong>{me.total_generations ?? 0}</strong></div>
        </div>
      </div>
    </div>
  );
}
