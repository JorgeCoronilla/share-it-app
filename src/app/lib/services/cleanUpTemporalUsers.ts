import client from '../db/db';

// Set up a cleanup task to run every hour
const cleanupInterval = 1000 * 60 * 60;

export const cleanUpTemporalUsers = (email: string) => {
  setInterval(async () => {
    try {
      if (!client) {
        throw new Error('DB client not initialized: Wrong credentials');
      }
      await client.execute({
        sql: 'DELETE FROM temporal_users WHERE email = ?',
        args: [email],
      });
      const cleaningTime = new Date();
      console.log('Cleanup successful.', email, cleaningTime);
    } catch (err) {
      console.error('Error during cleanup:', err);
    }
  }, cleanupInterval);
};
