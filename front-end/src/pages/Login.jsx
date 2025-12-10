// import React, { useState } from 'react';
// import { supabase } from '../lib/supabaseClient';
// import { Link, useNavigate, useLocation } from 'react-router-dom';

// /**
//  * Login component
//  *
//  * Props:
//  * - redirectTo (optional): string - route to go after successful login if fully signed up (defaults to '/generator')
//  * - onLogin (optional): function(user) - callback fired with the user object after successful sign-in
//  * - isFullySignedUpOverride (optional): boolean - if provided, use this to determine whether to send user to generator
//  *
//  * Note: For Google OAuth to work you must configure the redirect URLs in your Supabase project settings.
//  */
// export default function Login({ redirectTo = '/generator', onLogin, isFullySignedUpOverride }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [remember, setRemember] = useState(true);
//   const [err, setErr] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [oauthLoading, setOauthLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Determine where to redirect after login if there is an `from` state
//   const nextFrom = (location.state && location.state.from) || null;

//   function inferIsFullySignedUp(user) {
//     if (typeof isFullySignedUpOverride === 'boolean') return isFullySignedUpOverride;
//     if (!user) return false;

//     if (user.user_metadata && user.user_metadata.profileComplete === true) return true;
//     if (user.app_metadata && user.app_metadata.signup_complete === true) return true;
//     if (user.confirmed_at) return true; // Supabase email confirmed
//     if (user.email) return true; // fallback - treat as signed up
//     return false;
//   }

//   async function submit(e) {
//     e.preventDefault();
//     setErr('');
//     setLoading(true);

//     // Basic client-side validation
//     if (!email) {
//       setErr('Please enter your email.');
//       setLoading(false);
//       return;
//     }
//     if (!password) {
//       setErr('Please enter your password.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const options = {
//         // optionally set how long the session lasts / or persist via localStorage - handled by Supabase
//       };

//       // signInWithPassword returns { data, error } in supabase-js v2
//       const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
//       if (error) {
//         setErr(error.message || 'Failed to sign in.');
//         setLoading(false);
//         return;
//       }

//       const user = data?.user ?? null;

//       // If you want to persist session differently, Supabase client auto handles it.
//       // After sign in, Supabase will update auth state; we still navigate.

//       const fullySignedUp = inferIsFullySignedUp(user);

//       // allow redirect target from location.state.from (if a ProtectedRoute set it)
//       const destination = nextFrom || (fullySignedUp ? redirectTo : '/complete-signup');

//       if (onLogin && typeof onLogin === 'function') onLogin(user);
//       navigate(destination, { replace: true });
//     } catch (error) {
//       console.error('Login error', error);
//       setErr(error.message || 'An unexpected error occurred.');
//     } finally {
//       setLoading(false);
//     }
//   }

//   /**
//    * Google OAuth sign in
//    * - For web flows, Supabase will redirect to your app after OAuth completes.
//    * - Make sure you've added the redirect URL(s) in Supabase dashboard (Auth > Settings).
//    */
//   async function signInWithGoogle() {
//     setErr('');
//     setOauthLoading(true);

//     try {
//       // You can pass options: { redirectTo: 'https://yourdomain.com/oauth/callback' }
//       const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           // Uncomment and set redirectTo if you need explicit redirect behavior:
//           // redirectTo: window.location.origin + '/auth/callback'
//         },
//       });

//       if (error) {
//         setErr(error.message || 'Google sign-in failed.');
//         setOauthLoading(false);
//         return;
//       }

//       // For OAuth, supabase typically redirects the browser; in some environments
//       // data will contain a url - supabase client will handle redirect automatically.
//       // If supabase returns a url, you can optionally navigate to it:
//       if (data?.url) {
//         window.location.href = data.url;
//       }
//       // otherwise the redirect happens automatically by Supabase
//     } catch (error) {
//       console.error('Google OAuth error', error);
//       setErr(error.message || 'Google sign-in failed.');
//       setOauthLoading(false);
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h3 className="text-xl font-bold mb-3 text-black">Login</h3>

//       <form onSubmit={submit} className="space-y-3" aria-label="login form">
//         <label className="block">
//           <span className="text-black font-medium">Email</span>
//           <input
//             type="email"
//             className="border p-2 rounded w-full mt-1 text-black"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             autoComplete="email"
//             required
//             aria-required="true"
//           />
//         </label>

//         <label className="block">
//           <div className="flex items-center justify-between">
//             <span className="text-black font-medium">Password</span>
//             <button
//               type="button"
//               onClick={() => setShowPassword((s) => !s)}
//               className="text-xs text-black"
//               aria-pressed={showPassword}
//             >
//               {showPassword ? 'Hide' : 'Show'}
//             </button>
//           </div>
//           <input
//             type={showPassword ? 'text' : 'password'}
//             className="border p-2 rounded w-full mt-1 text-black"
//             placeholder="Your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             autoComplete="current-password"
//             required
//           />
//         </label>

//         <div className="flex items-center justify-between">
//           <label className="inline-flex items-center text-black">
//             <input
//               type="checkbox"
//               checked={remember}
//               onChange={(e) => setRemember(e.target.checked)}
//               className="mr-2"
//             />
//             Remember me
//           </label>
       
//           <Link to="/forgotpassword" className="text-sm text-slate-600 hover:underline">
//             Forgot password?
//           </Link>
//         </div>

//         <div className="flex flex-col gap-2">
//           <button
//             type="submit"
//             className="bg-emerald-600 text-white px-4 py-2 rounded disabled:opacity-50"
//             disabled={loading}
//             aria-disabled={loading}
//           >
//             {loading ? 'Signing in…' : 'Login'}
//           </button>

//           <button
//             type="button"
//             onClick={signInWithGoogle}
//             className="flex items-center justify-center gap-2 border px-4 py-2 rounded text-black hover:bg-slate-50"
//             disabled={oauthLoading}
//             aria-disabled={oauthLoading}
//             aria-label="Sign in with Google"
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

//         {err && <div role="alert" className="text-red-600 mt-2">{err}</div>}
//       </form>

//       <p className="mt-4 text-sm text-slate-600">
//         Don't have an account? <Link to="/signup" className="text-emerald-600 hover:underline">Sign up</Link>
//       </p>
//     </div>
//   );
// }
//thats working file and if last file doesnot work so pls uncomment it|
// import React, { useState } from 'react';
// import { supabase } from '../lib/supabaseClient';
// import { Link, useNavigate, useLocation } from 'react-router-dom';

// export default function Login({ redirectTo = '/generator', onLogin, isFullySignedUpOverride }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [remember, setRemember] = useState(true);
//   const [err, setErr] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [oauthLoading, setOauthLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const nextFrom = (location.state && location.state.from) || null;

//   function inferIsFullySignedUp(user) {
//     if (typeof isFullySignedUpOverride === 'boolean') return isFullySignedUpOverride;
//     if (!user) return false;
//     if (user.user_metadata?.profileComplete === true) return true;
//     if (user.app_metadata?.signup_complete === true) return true;
//     if (user.confirmed_at) return true;
//     if (user.email) return true;
//     return false;
//   }

//   async function submit(e) {
//     e.preventDefault();
//     setErr('');
//     setLoading(true);

//     if (!email || !password) {
//       setErr('Please enter both email and password.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({ email, password });

//       if (error) {
//         setErr(error.message || 'Failed to sign in.');
//         setLoading(false);
//         return;
//       }

//       const user = data?.user ?? null;
//       const session = data?.session ?? null;

//       // ✅ Save token for api.js to use
//       if (session?.access_token) {
//         localStorage.setItem('sb_token', session.access_token);
//       }
//       console.log('Saved token:', localStorage.getItem('sb_token'));

//       const fullySignedUp = inferIsFullySignedUp(user);
//       const destination = nextFrom || (fullySignedUp ? redirectTo : '/complete-signup');

//       if (onLogin && typeof onLogin === 'function') onLogin(user);
//       navigate(destination, { replace: true });
//     } catch (error) {
//       console.error('Login error', error);
//       setErr(error.message || 'An unexpected error occurred.');
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function signInWithGoogle() {
//     setErr('');
//     setOauthLoading(true);

//     try {
//       const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           redirectTo: window.location.origin + '/auth/callback'
//         },
//       });

//       if (error) {
//         setErr(error.message || 'Google sign-in failed.');
//         setOauthLoading(false);
//         return;
//       }

//       if (data?.url) {
//         window.location.href = data.url;
//       }
//     } catch (error) {
//       console.error('Google OAuth error', error);
//       setErr(error.message || 'Google sign-in failed.');
//       setOauthLoading(false);
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h3 className="text-xl font-bold mb-3 text-black">Login</h3>
//       <form onSubmit={submit} className="space-y-3" aria-label="login form">
//         {/* Email input */}
//         <label className="block">
//           <span className="text-black font-medium">Email</span>
//           <input
//             type="email"
//             className="border p-2 rounded w-full mt-1 text-black"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             autoComplete="email"
//             required
//           />
//         </label>

//         {/* Password input */}
//         <label className="block">
//           <div className="flex items-center justify-between">
//             <span className="text-black font-medium">Password</span>
//             <button
//               type="button"
//               onClick={() => setShowPassword((s) => !s)}
//               className="text-xs text-black"
//             >
//               {showPassword ? 'Hide' : 'Show'}
//             </button>
//           </div>
//           <input
//             type={showPassword ? 'text' : 'password'}
//             className="border p-2 rounded w-full mt-1 text-black"
//             placeholder="Your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             autoComplete="current-password"
//             required
//           />
//         </label>

//         {/* Remember me + Forgot password */}
//         <div className="flex items-center justify-between">
//           <label className="inline-flex items-center text-black">
//             <input
//               type="checkbox"
//               checked={remember}
//               onChange={(e) => setRemember(e.target.checked)}
//               className="mr-2"
//             />
//             Remember me
//           </label>
//           <Link to="/forgotpassword" className="text-sm text-slate-600 hover:underline">
//             Forgot password?
//           </Link>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col gap-2">
//           <button
//             type="submit"
//             className="bg-emerald-600 text-white px-4 py-2 rounded disabled:opacity-50"
//             disabled={loading}
//           >
//             {loading ? 'Signing in…' : 'Login'}
//           </button>

//           <button
//             type="button"
//             onClick={signInWithGoogle}
//             className="flex items-center justify-center gap-2 border px-4 py-2 rounded text-black hover:bg-slate-50"
//             disabled={oauthLoading}
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

//         {err && <div role="alert" className="text-red-600 mt-2">{err}</div>}
//       </form>

//       <p className="mt-4 text-sm text-slate-600">
//         Don't have an account? <Link to="/signup" className="text-emerald-600 hover:underline">Sign up</Link>
//       </p>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Login({ redirectTo = '/generator', onLogin, isFullySignedUpOverride }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const nextFrom = (location.state && location.state.from) || null;

  // ⭐⭐⭐ IMPORTANT — HANDLE GOOGLE OAUTH CALLBACK HERE ⭐⭐⭐
  useEffect(() => {
    async function handleOAuthReturn() {
      const url = window.location.href;

      // Callback detected
      if (url.includes("/auth/callback")) {
        const { data } = await supabase.auth.getSession();

        if (data?.session?.access_token) {
          // Save token
          localStorage.setItem("sb_token", data.session.access_token);

          // Redirect to homepage or generator
          navigate(redirectTo, { replace: true });
        }
      }
    }
    handleOAuthReturn();
  }, []);

  function inferIsFullySignedUp(user) {
    if (typeof isFullySignedUpOverride === 'boolean') return isFullySignedUpOverride;
    if (!user) return false;
    if (user.user_metadata?.profileComplete === true) return true;
    if (user.app_metadata?.signup_complete === true) return true;
    if (user.confirmed_at) return true;
    if (user.email) return true;
    return false;
  }

  // ---------------- EMAIL/PASSWORD LOGIN ----------------
  async function submit(e) {
    e.preventDefault();
    setErr('');
    setLoading(true);

    if (!email || !password) {
      setErr('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setErr(error.message || 'Failed to sign in.');
        setLoading(false);
        return;
      }

      const user = data?.user ?? null;
      const session = data?.session ?? null;

      if (session?.access_token) {
        localStorage.setItem('sb_token', session.access_token);
      }

      const fullySignedUp = inferIsFullySignedUp(user);
      const destination = nextFrom || (fullySignedUp ? redirectTo : '/complete-signup');

      if (onLogin && typeof onLogin === 'function') onLogin(user);
      navigate(destination, { replace: true });
    } catch (error) {
      setErr(error.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  // ---------------- GOOGLE LOGIN ----------------
  async function signInWithGoogle() {
    setErr('');
    setOauthLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + '/auth/callback' },
      });

      if (error) {
        setErr(error.message || 'Google sign-in failed.');
        setOauthLoading(false);
        return;
      }

      if (data?.url) window.location.href = data.url;
    } catch (error) {
      setErr(error.message || 'Google login failed.');
      setOauthLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h3 className="text-xl font-bold mb-3 text-black">Login</h3>

      <form onSubmit={submit} className="space-y-3">
        
        {/* Email Input */}
        <label className="block">
          <span className="text-black font-medium">Email</span>
          <input
            type="email"
            className="border p-2 rounded w-full mt-1 text-black"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        {/* Password Input */}
        <label className="block">
          <div className="flex items-center justify-between">
            <span className="text-black font-medium">Password</span>
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="text-xs text-black"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            className="border p-2 rounded w-full mt-1 text-black"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <label className="inline-flex items-center text-black">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="mr-2"
            />
            Remember me
          </label>
          <Link to="/forgotpassword" className="text-sm text-slate-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Login'}
        </button>

        {/* Google Button */}
        <button
          type="button"
          onClick={signInWithGoogle}
          className="flex items-center justify-center gap-2 border px-4 py-2 rounded text-black hover:bg-slate-50 w-full"
          disabled={oauthLoading}
        >
          {oauthLoading ? 'Redirecting…' : 'Continue with Google'}
        </button>

        {err && <div className="text-red-600 mt-2">{err}</div>}
      </form>

      <p className="mt-4 text-sm text-slate-600">
        Don't have an account? <Link to="/signup" className="text-emerald-600 hover:underline">Sign up</Link>
      </p>
    </div>
  );
}
