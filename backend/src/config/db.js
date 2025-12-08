// import pkg from 'pg';
// const { Pool } = pkg;
// import { DATABASE_URL } from './env.js';

// export const pool = new Pool({
//   connectionString: DATABASE_URL,
//   max: 10,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000
// });

// export async function query(text, params) {
//   const start = Date.now();
//   const res = await pool.query(text, params);
//   const duration = Date.now() - start;
//   // option: log slow queries
//   return res;
// }

//Last update krne se pehle ye niche ka code thaa na k upar ka:
// import pkg from 'pg';
// const { Pool } = pkg;
// import { DATABASE_URL } from './env.js';

// export const pool = new Pool({
//   connectionString: DATABASE_URL,
//   ssl: { rejectUnauthorized: false },
//   max: 5,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 20000
// });

// // ✅ Named export for query
// export async function query(text, params) {
//   try {
//     const res = await pool.query(text, params);
//     return res;
//   } catch (err) {
//     console.error("DB Query Error:", err.message);
//     throw err;
//   }
// }

// // Optional: test connection
// pool.connect()
//   .then(client => {
//     console.log("🟢 Database connected successfully");
//     client.release();
//   })
//   .catch(err => console.error("🔴 Database connection error:", err.message));
import pkg from 'pg';
const { Pool } = pkg;
import { DATABASE_URL } from './env.js';

let pool = null;
let recreateTimer = null;
let backoff = 1000; // start retry timer 1 sec

// Create new pool
function createPool() {
  if (pool) return pool;

  pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000
  });

  console.log("🟢 PG Pool created");

  // Handle unexpected pool errors
  pool.on("error", (err) => {
    console.error("⚠ PG Pool Error:", err.message);
    tryRecreatePoolWithBackoff(err);
  });

  return pool;
}

async function tryRecreatePoolWithBackoff(err) {
  if (recreateTimer) return; // prevent multiple schedule

  recreateTimer = setTimeout(async () => {
    console.log(`♻ Attempting Pool Recreate | Backoff: ${backoff} ms`);

    try {
      if (pool) {
        await pool.end().catch(() => {});
        pool = null;
      }

      createPool(); // new pool

      console.log("🟢 Pool Recreated Successfully");
      backoff = 1000; // reset backoff after success

    } catch (e) {
      console.error("❌ Pool Recreate Failed:", e.message);
      backoff = Math.min(backoff * 2, 30000); // exponential 1s → 30s max
      recreateTimer = null;
      tryRecreatePoolWithBackoff(e);
    }

    recreateTimer = null;
  }, backoff);

  backoff = Math.min(backoff * 2, 30000); // increase backoff
}

// Query Wrapper
export async function query(text, params) {
  const p = createPool();
  const client = await p.connect();

  try {
    return await client.query(text, params);
  } catch (err) {
    console.error("❌ DB Query Error:", err.message);
    throw err;
  } finally {
    client.release(); // release always
  }
}

// Test connection on startup
(async () => {
  try {
    const p = createPool();
    const client = await p.connect();
    console.log("🟢 Database connected successfully");
    client.release();
  } catch (err) {
    console.error("🔴 Initial connection error:", err.message);
  }
})();
