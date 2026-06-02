const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL must be set in environment');
}

const isProd = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString,
  ssl: isProd
    ? { rejectUnauthorized: false } // Render / cloud
    : false // local docker postgres
});

module.exports = { pool };