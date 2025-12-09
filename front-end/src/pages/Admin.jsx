import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { supabase } from '../lib/supabaseClient';

export default function Admin() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('sb_token');
        const res = await fetch(`${import.meta.env.VITE_API}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Forbidden');
        setStats(json);
      } catch (e) {
        setStats({ error: e.message });
      }
    })();
  }, []);
  

  if (!stats) return <Loader />;
  if (stats.error)
    return (
      <div className="text-red-600 text-center mt-8 font-semibold">
        {stats.error}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Users Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
          <h2 className="text-gray-500 font-medium mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-gray-800">{stats.total_users}</p>
        </div>

        {/* Generations Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
          <h2 className="text-gray-500 font-medium mb-2">Total Generations</h2>
          <p className="text-3xl font-bold text-gray-800">{stats.total_generations}</p>
        </div>

        {/* Revenue Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
          <h2 className="text-gray-500 font-medium mb-2">Revenue</h2>
          <p className="text-3xl font-bold text-gray-800">₹{stats.revenue}</p>
        </div>
      </div>

      {/* Optional extra section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <p className="text-gray-600">
          You can add recent user activity, latest generations, or charts here
          to make the dashboard more professional.
        </p>
      </div>
    </div>
  );
}
