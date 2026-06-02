const request = require('supertest');
const app = require('../src/app');
const { pool } = require('../src/db');

const TEST_CLIENT_ID = `jest-test-${Date.now()}`;
const BASE_URL = 'http://example.com/test-url';

async function cleanup() {
  await pool.query('DELETE FROM click_events WHERE url_id IN (SELECT id FROM urls WHERE client_id = $1)', [TEST_CLIENT_ID]);
  await pool.query('DELETE FROM urls WHERE client_id = $1', [TEST_CLIENT_ID]);
}

describe('Backend API', () => {
  afterAll(async () => {
    await cleanup();
    await pool.end();
  });

  afterEach(async () => {
    await cleanup();
  });

  test('health route returns ok status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(typeof response.body.uptime).toBe('number');
  });

  test('POST /api/urls creates a URL entry', async () => {
    const response = await request(app)
      .post('/api/urls')
      .send({ originalUrl: BASE_URL, clientId: TEST_CLIENT_ID });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      client_id: TEST_CLIENT_ID,
      original_url: BASE_URL,
      click_count: 0,
    });
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('short_code');
    expect(response.body.short_code).toHaveLength(8);
  });

  test('GET /api/urls returns only URLs for the clientId', async () => {
    await request(app).post('/api/urls').send({ originalUrl: `${BASE_URL}/1`, clientId: TEST_CLIENT_ID });
    await request(app).post('/api/urls').send({ originalUrl: `${BASE_URL}/2`, clientId: TEST_CLIENT_ID });

    const response = await request(app).get('/api/urls').query({ clientId: TEST_CLIENT_ID });

    expect(response.status).toBe(200);
    expect(response.body.urls).toHaveLength(2);
    expect(response.body.urls.every((item) => item.client_id === TEST_CLIENT_ID)).toBe(true);
  });

  test('DELETE /api/urls/:id enforces ownership by clientId', async () => {
    const createResponse = await request(app)
      .post('/api/urls')
      .send({ originalUrl: BASE_URL, clientId: TEST_CLIENT_ID });

    const urlId = createResponse.body.id;

    const wrongDelete = await request(app)
      .delete(`/api/urls/${urlId}`)
      .query({ clientId: 'wrong-client' });

    expect(wrongDelete.status).toBe(404);

    const correctDelete = await request(app)
      .delete(`/api/urls/${urlId}`)
      .query({ clientId: TEST_CLIENT_ID });

    expect(correctDelete.status).toBe(204);

    const listResponse = await request(app).get('/api/urls').query({ clientId: TEST_CLIENT_ID });
    expect(listResponse.body.urls).toHaveLength(0);
  });

  test('GET /:shortCode redirects to the original URL', async () => {
    const createResponse = await request(app)
      .post('/api/urls')
      .send({ originalUrl: BASE_URL, clientId: TEST_CLIENT_ID });

    const { short_code } = createResponse.body;
    const redirectResponse = await request(app).get(`/${short_code}`).redirects(0);

    expect(redirectResponse.status).toBe(302);
    expect(redirectResponse.headers.location).toBe(BASE_URL);
  });

  test('Unknown short code returns 404', async () => {
    const response = await request(app).get('/no-such-code').redirects(0);
    expect(response.status).toBe(404);
  });
});
