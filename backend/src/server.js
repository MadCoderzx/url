const http = require('http');
const app = require('./app');
require('./config');
const { initDb } = require('./db');

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await initDb();
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to PostgreSQL:', error);
    process.exit(1);
  }
}

start();
