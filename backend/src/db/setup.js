const fs = require('fs');
const path = require('path');
const { pool } = require('./index');

async function run() {
  const sqlPath = path.resolve(process.cwd(), '..', 'database', 'init.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  await pool.query(sql);
  console.log('Database schema initialized successfully.');
}

run().catch((err) => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});
