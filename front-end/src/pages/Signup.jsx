// import React, { useState } from 'react';
// import { supabase } from '../lib/supabaseClient';
// import { useNavigate } from 'react-router-dom';

// export default function Signup(){
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [err, setErr] = useState('');
//   const navigate = useNavigate();

//   async function submit(e){
//     e.preventDefault(); setErr('');
//     const { data, error } = await supabase.auth.signUp({ email, password });
//     if(error) return setErr(error.message);
//     // show prompt to check email, or navigate
//     navigate('/generator');
//   }

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h3 className="text-xl font-bold mb-3">Create account</h3>
//       <form onSubmit={submit} className="space-y-3">
//         <input className="border p-2 rounded w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
//         <input type="password" className="border p-2 rounded w-full" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
//         <button className="bg-emerald-600 text-white px-4 py-2 rounded">Sign up</button>
//         {err && <div className="text-red-600">{err}</div>}
//       </form>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { supabase } from '../lib/supabaseClient'; // keep as named import if your client exports it that way

// /**
//  * Signup component
//  *
//  * Props:
//  * - redirectTo (optional) - where to go after successful sign up when fully signed up (default: '/generator')
//  * - onSignup (optional) - callback(user) after a successful signup
//  * - isFullySignedUpOverride (optional) - boolean to override inference of 'fully signed up'
//  *
//  * NOTE: For Google OAuth to work ensure redirect URLs are configured in Supabase dashboard (Auth -> Settings).
//  */
// export default function Signup({ redirectTo = '/generator', onSignup, isFullySignedUpOverride }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirm, setConfirm] = useState('');
//   const [remember, setRemember] = useState(true);
//   const [agreeTerms, setAgreeTerms] = useState(false);
  
//   const [loading, setLoading] = useState(false);
//   const [oauthLoading, setOauthLoading] = useState(false);
//   const [err, setErr] = useState('');
//   const [successMsg, setSuccessMsg] = useState('');

//   const navigate = useNavigate();
//   const location = useLocation();
//   const nextFrom = (location.state && location.state.from) || null;

//   function inferIsFullySignedUp(user) {
//     // override if provided
//     if (typeof isFullySignedUpOverride === 'boolean') return isFullySignedUpOverride;
//     if (!user) return false;

//     if (user.user_metadata && user.user_metadata.profileComplete === true) return true;
//     if (user.app_metadata && user.app_metadata.signup_complete === true) return true;
//     if (user.confirmed_at) return true; // email confirmed
//     if (user.email) return true; // fallback
//     return false;
//   }

//   function validateForm() {
//     setErr('');
//     if (!email) return setErr('Email is required.');
//     // simple email regex (basic)
//     const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRe.test(email)) return setErr('Please enter a valid email address.');
//     if (!password || password.length < 8) return setErr('Password must be at least 8 characters.');
//     if (password !== confirm) return setErr('Passwords do not match.');
//     if (!agreeTerms) return setErr('You must agree to the terms to create an account.');
//     return true;
//   }
//   async function handleSignup(email, password) {
//   try {
//     const { data: authData, error: authError } = await supabase.auth.signUp({
//       email,
//       password
//     });

//     if (authError) throw authError;

//     // supabase auth user object
//     const userId = authData.user.id;

//     // users table me row insert karo
//     const { data: userRow, error: insertError } = await supabase
//       .from('users')
//       .insert({
//         id: userId,
//         email: email,
//         credits: 20,    // free credits
//         plan: 'free'
//       })
//       .select(); // select se naya row return hoga

//     if (insertError) throw insertError;

//     console.log('User row created:', userRow);

//     // ab profile page ke liye localStorage ya state update kar sakte ho
//     localStorage.setItem('me', JSON.stringify(userRow[0]));

//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// }


//   async function submit(e) {
//   e.preventDefault();
//   setErr('');
//   setSuccessMsg('');

//   if (!validateForm()) return;

//   setLoading(true);
//   try {
//     // signup user
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: { emailRedirectTo: window.location.origin + '/login' } // optional, user verify ke baad login page
//     });

//     if (error) {
//       setErr(error.message || 'Signup failed.');
//       return;
//     }

//     // user object
//     const user = data?.user ?? null;

//     // insert user in 'users' table with 20 free credits
//     if (user) {
//       const { data: userRow, error: insertError } = await supabase
//         .from('users')
//         .insert({ id: user.id, email, credits: 20, plan: 'free' })
//         .select();
//       if (insertError) throw insertError;

//       // localStorage update for profile page
//       localStorage.setItem('me', JSON.stringify(userRow[0]));
//     }

//     // **message to check email**
//     setSuccessMsg(
//       'Account created! Please check your email and confirm your account before logging in.'
//     );

//     // **yaha redirect mat karo**, user tab tak yaha rahega jab tak verify nahi hota

//   } catch (error) {
//     console.error('Signup error', error);
//     setErr(error?.message || 'An unexpected error occurred during sign up.');
//   } finally {
//     setLoading(false);
//   }
// }


//   // OAuth sign-up (Google)
//   async function signUpWithGoogle() {
//     setErr('');
//     setOauthLoading(true);
//     try {
//       const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           // redirectTo: window.location.origin + '/auth/callback' // optional
//         },
//       });

//       if (error) {
//         setErr(error.message || 'Google signup failed.');
//         setOauthLoading(false);
//         return;
//       }

//       // Typically Supabase will redirect the browser to data.url (if provided)
//       if (data?.url) {
//         window.location.href = data.url;
//       }
//       // otherwise the redirect is handled by the Supabase client automatically
//     } catch (error) {
//       console.error('Google OAuth signup error', error);
//       setErr(error?.message || 'Google signup failed.');
//       setOauthLoading(false);
//     }
//   }

//   // small password strength helper (very basic)
//   function passwordStrength(pw = '') {
//     if (pw.length >= 12 && /[A-Z]/.test(pw) && /\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) return 'strong';
//     if (pw.length >= 10 && ((/[A-Z]/.test(pw) && /\d/.test(pw)) || (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)))) return 'good';
//     if (pw.length >= 8) return 'weak';
//     return 'too short';
//   }
//   <form onSubmit={async (e) => {
//   e.preventDefault();
//   await handleSignup(email, password);
// }}>
//   <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
//   <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
//   <button type="submit">Sign Up</button>
// </form>
//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h3 className="text-xl font-bold mb-3 text-black">Create account</h3>

//       <form onSubmit={submit} className="space-y-4" aria-label="signup form">
//         <label className="block">
//           <span className="text-sm font-medium text-black">Email</span>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value.trim())}
//             className="border p-2 rounded w-full mt-1 text-black"
//             placeholder="you@example.com"
//             required
//             autoComplete="email"
//           />
//         </label>

//         <label className="block">
//           <span className="text-sm font-medium text-black">Password</span>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border p-2 rounded w-full mt-1 text-black"
//             placeholder="At least 8 characters"
//             required
//             autoComplete="new-password"
//           />
//           <div className="mt-1 text-xs text-slate-500">
//             Strength: <strong>{passwordStrength(password)}</strong>
//           </div>
//         </label>

//         <label className="block">
//           <span className="text-sm font-medium text-black">Confirm password</span>
//           <input
//             type="password"
//             value={confirm}
//             onChange={(e) => setConfirm(e.target.value)}
//             className="border p-2 rounded w-full mt-1 text-black"
//             placeholder="Repeat your password"
//             required
//             autoComplete="new-password"
//           />
//         </label>

//         <div className="flex items-center gap-3">
//           <label className="inline-flex items-center text-black">
//             <input
//               type="checkbox"
//               checked={agreeTerms}
//               onChange={(e) => setAgreeTerms(e.target.checked)}
//               className="mr-2"
//             />
//             I agree to the <Link to="/terms" className="text-emerald-600 hover:underline"> _terms</Link>
//           </label>

//           <label className="inline-flex items-center text-black ml-auto">
//             <input
//               type="checkbox"
//               checked={remember}
//               onChange={(e) => setRemember(e.target.checked)}
//               className="mr-2"
//             />
//             Remember me
//           </label>
//         </div>

//         <div className="flex flex-col gap-2">
//           <button
//             type="submit"
//             className="bg-emerald-600 text-white px-4 py-2 rounded disabled:opacity-50"
//             disabled={loading}
//             aria-disabled={loading}
//           >
//             {loading ? 'Creating account…' : 'Sign up'}
//           </button>

//           <button
//             type="button"
//             onClick={signUpWithGoogle}
//             className="flex items-center justify-center gap-2 border px-4 py-2 rounded text-black hover:bg-slate-50"
//             disabled={oauthLoading}
//             aria-disabled={oauthLoading}
//           >
//             {oauthLoading ? 'Redirecting…' : (
//               <>
//                 <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="inline-block">
//                   <path fill="#EA4335" d="M12 11.5v3.6h5.3c-.2 1.2-1.4 3.4-5.3 3.4-3.2 0-6-2.6-6-6s2.8-6 6-6c1.8 0 3 .8 3.8 1.5l2.6-2.6C17.3 5.1 14.9 4 12 4 7.6 4 4 7.6 4 12s3.6 8 8 8c4.6 0 7.4-3.2 7.4-7.7 0-.5 0-.9-.1-1.3H12z" />
//                 </svg>
//                 Continue with Google
//               </>
//             )}
//           </button>
//         </div>

//         {err && <div role="alert" className="text-red-600">{err}</div>}
//         {successMsg && <div role="status" className="text-emerald-700">{successMsg}</div>}
//       </form>

//       <p className="mt-4 text-sm text-slate-600">
//         Already have an account? <Link to="/login" className="text-emerald-600 hover:underline">Login</Link>
//       </p>
//     </div>
//   );
// }

// Upgraded and clean Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Signup({ redirectTo = '/login' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  function validateForm() {
    setErr('');
    if (!email) return setErr('Email is required.');

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) return setErr('Please enter a valid email address.');

    if (!password || password.length < 8) return setErr('Password must be at least 8 characters.');

    if (password !== confirm) return setErr('Passwords do not match.');

    if (!agreeTerms) return setErr('You must agree to the terms.');

    return true;
  }

  async function submit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErr('');
    setSuccessMsg('');

    try {
      // Step 1: create auth user but DO NOT redirect
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + '/login',
        },
      });

      if (error) {
        setErr(error.message);
        return;
      }

      const authUser = data?.user;

      // Step 2: Insert into users table only if auth user created
      if (authUser) {
        const { error: insertErr } = await supabase.from('users').insert({
          id: authUser.id,
          email: email,
          credits: 20,
          plan: 'free'
        });

        if (insertErr) {
          console.log(insertErr);
        }
      }

      setSuccessMsg('Account created! Please check your email and verify your account.');

    } catch (err) {
      setErr(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h3 className="text-xl font-bold mb-3 text-black">Create account</h3>

      <form onSubmit={submit} className="space-y-4">

        <label className="block">
          <span className="text-sm font-medium text-black">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full mt-1 text-black"
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-black">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full mt-1 text-black"
            placeholder="At least 8 characters"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-black">Confirm password</span>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="border p-2 rounded w-full mt-1 text-black"
            placeholder="Repeat your password"
            required
          />
        </label>

        <label className="flex items-center gap-2 text-black">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          I agree to the <Link to="/terms" className="text-emerald-600">terms</Link>
        </label>

        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Creating account…' : 'Sign up'}
        </button>

        {err && <div className="text-red-600">{err}</div>}
        {successMsg && <div className="text-emerald-700">{successMsg}</div>}
      </form>

      <p className="mt-4 text-sm text-slate-600">
        Already have an account? <Link to="/login" className="text-emerald-600">Login</Link>
      </p>
    </div>
  );
}