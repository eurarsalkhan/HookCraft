import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { Api } from '../lib/api';

export default function History(){
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    // if backend has /users/me/history replace Api.getHistory
    Api.getHistory().then(setList).catch(()=>{}).finally(()=>setLoading(false));
  }, []);

  if(loading) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-xl font-bold mb-4">History</h3>
      <div className="space-y-3">
        {list.length === 0 && <div className="text-gray-600">No history yet</div>}
        {list.map((g)=> (
          <div key={g.id} className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Topic: {g.input_topic} — {new Date(g.created_at).toLocaleString()}</div>
            <div className="mt-2 space-y-2">
              { (g.response_text || []).map((h, idx)=> <div key={idx} className="p-2 border rounded">{h}</div>) }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
