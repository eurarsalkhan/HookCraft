import { pool } from './db.js';   // ← correct

pool.query('SELECT NOW()')
  .then(res => console.log('DB Connected:', res.rows))
  .catch(err => console.error('DB ERROR:', err.message));
