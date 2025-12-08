// import { getSupabaseUserByToken, ensureLocalUser } from '../modules/auth/index.js';

// export async function requireAuth(req, res, next) {
//   try {
//     const auth = req.headers.authorization;
//     if (!auth) return res.status(401).json({ error: 'Missing Authorization header' });
//     const token = auth.split(' ')[1];
//     if (!token) return res.status(401).json({ error: 'Invalid token format' });

//     const { user, error } = await getSupabaseUserByToken(token);
//     if (error || !user) return res.status(401).json({ error: 'Invalid or expired token' });

//     // ensure user exists in local DB
//     const profile = await ensureLocalUser(user);
//     req.user = profile; // local DB row with id, credits, etc.
//     next();
//   } catch (err) {
//     console.error('Auth middleware error', err);
//     return res.status(401).json({ error: 'Authentication failed' });
//   }
// }
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();
// Use your Supabase project URL and Service Role Key (NOT the anon key)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Missing Authorization header' });
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Invalid token format' });
    }

    // ✅ Validate token directly with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Attach user info to request
    req.user = {
      id: user.id,
      email: user.email,
      ...user.user_metadata
    };

    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({ error: 'Authentication failed' });
  }
  

}
