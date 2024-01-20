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

export default client;
