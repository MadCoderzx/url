const { pool } = require('../db');

async function findUrlByShortCode(shortCode) {
  const result = await pool.query('SELECT * FROM urls WHERE short_code = $1 LIMIT 1', [shortCode]);
  return result.rows[0] || null;
}

async function findUrlsByClientId(clientId) {
  const result = await pool.query(
    'SELECT id, client_id, original_url, short_code, click_count, created_at, updated_at, last_accessed_at FROM urls WHERE client_id = $1 ORDER BY created_at DESC',
    [clientId]
  );
  return result.rows;
}

async function createUrlEntry({ clientId, originalUrl, shortCode }) {
  const result = await pool.query(
    `INSERT INTO urls (client_id, original_url, short_code)
     VALUES ($1, $2, $3)
     RETURNING id, client_id, original_url, short_code, click_count, created_at, updated_at, last_accessed_at`,
    [clientId, originalUrl, shortCode]
  );
  return result.rows[0];
}

async function deleteUrlByIdAndClient(id, clientId) {
  const result = await pool.query(
    'DELETE FROM urls WHERE id = $1 AND client_id = $2 RETURNING id',
    [id, clientId]
  );
  return result.rowCount > 0;
}

async function shortCodeExists(shortCode) {
  const result = await pool.query('SELECT 1 FROM urls WHERE short_code = $1 LIMIT 1', [shortCode]);
  return result.rowCount > 0;
}

async function trackUrlRedirect(urlId, userAgent, ipAddress) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      'UPDATE urls SET click_count = click_count + 1, last_accessed_at = NOW() WHERE id = $1',
      [urlId]
    );
    await client.query(
      'INSERT INTO click_events (url_id, user_agent, ip_address) VALUES ($1, $2, $3)',
      [urlId, userAgent, ipAddress]
    );
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  findUrlByShortCode,
  findUrlsByClientId,
  createUrlEntry,
  deleteUrlByIdAndClient,
  shortCodeExists,
  trackUrlRedirect,
};
