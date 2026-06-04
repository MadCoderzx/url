const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL must be set in environment');
}

const isProd = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString,
  ssl: isProd
    ? { rejectUnauthorized: false }
    : false
});

async function initDb() {
  await pool.query('SELECT 1');
  console.log('PostgreSQL connected');
}

module.exports = {
  pool,
  initDb
};
