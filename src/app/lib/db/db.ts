import { createClient, Client } from '@libsql/client';

// Connect to the database
let client: Client | undefined;

if (process.env.DB_URL && process.env.DB_AUTH_TOKEN) {
  client = createClient({
    url: process.env.DB_URL,
    authToken: process.env.DB_AUTH_TOKEN,
  });
} else {
  console.error('DB credentials not found');
}

if (!client) {
  throw new Error('DB client not initialized: Wrong credentials');
}

// Set up a cleanup task to run every hour
const cleanupInterval = 1000 * 60 * 60; // 1 hour in milliseconds

setInterval(async () => {
  try {
    // Cleanup logic
    const cutoffTime = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
    const cutoffTimeString = cutoffTime.toISOString();
    if (!client) {
      throw new Error('DB client not initialized: Wrong credentials');
    }
    await client.execute({
      sql: 'DELETE FROM your_table_name WHERE datetime(created_at) < datetime(?);',
      args: [cutoffTimeString],
    });

    console.log('Cleanup successful.');
  } catch (err) {
    // Log the error without stopping the cleanup process
    console.error('Error during cleanup:', err);
  }
}, cleanupInterval);

export default client;
