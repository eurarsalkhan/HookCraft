// // tiny API helpers for backend interaction (wraps fetch with auth)
// const API = import.meta.env.VITE_API || '';

// function getToken() {
//   return localStorage.getItem('sb_token') || null;
// }

// // async function request(path, { method = 'GET', body, auth = true } = {}) {
// //   const headers = { 'Content-Type': 'application/json' };
// //   if (auth) {
// //     const token = getToken();

// //     if (token) headers.Authorization = `Bearer ${token}`;
// //   }
// //   const res = await fetch(`${API}${path}`, {
// //     method,
// //     headers,
// //     body: body ? JSON.stringify(body) : undefined
// //   });
// //   const text = await res.text();
// //   let json;
// //   try { json = text ? JSON.parse(text) : {}; } catch (e) { json = { raw: text }; }
// //   if (!res.ok) throw new Error(json.error || json.message || 'API error');
// //   return json;
// // }

// // export const Api = {
// //   generate: (payload) => request('/generate', { method: 'POST', body: payload }),
// //   getMe: () => request('/users/me'),
// //   createCheckout: (payload) => request('/payments/create-checkout', { method: 'POST', body: payload }),
// //   getHistory: () => request('/users/me/history') // optional endpoint if backend adds
// // };
// async function request(path, { method = 'GET', body, auth = true } = {}) {
//   const headers = { 'Content-Type': 'application/json' };
//   if (auth) {
//     const token = getToken();
//     if (token) headers.Authorization = `Bearer ${token}`;
//   }

//   // 🔥 Log frontend sending data
//   console.log("➡️ Frontend sending request:", { path, method, headers, body });

//   const res = await fetch(`${API}${path}`, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : undefined
//   });

//   const text = await res.text();
//   let json;
//   try { json = text ? JSON.parse(text) : {}; } catch (e) { json = { raw: text }; }

//   // 🔥 Log frontend received response
//   console.log("⬅️ Frontend received response:", { status: res.status, json });

//   if (!res.ok) throw new Error(json.error || json.message || 'API error');
//   return json;
// }
// export const Api = {
//   generate: (payload) => request('/generate', { method: 'POST', body: payload }),
//   getMe: () => request('/users/me'),
//   createCheckout: (payload) => request('/payments/create-checkout', { method: 'POST', body: payload }),
//   getHistory: () => request('/users/me/history') // optional endpoint if backend adds
// };

const API = import.meta.env.VITE_API || '';

function getToken() {
  return localStorage.getItem('sb_token') || null;
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await res.text();
  let json;
  try { json = text ? JSON.parse(text) : {}; } catch (e) { json = { raw: text }; }

  if (!res.ok) throw new Error(json.error || json.message || 'API error');
  return json;
}

export const Api = {
  generate: (payload) => request('/api/generate', { method: 'POST', body: payload }),
  getMe: () => request('/users/me'),

  createRazorpayOrder: (payload) =>
    request('/payments/create-order', { method: 'POST', body: payload }),

  verifyRazorpayPayment: (payload) =>
    request('/payments/verify', { method: 'POST', body: payload }),

  getHistory: () => request('/users/me/history')
};
