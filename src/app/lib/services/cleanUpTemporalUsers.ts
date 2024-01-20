import client from '../db/db';

// Set up a cleanup task to run every hour
const cleanupInterval = 1000 * 60 * 20; // 1 hour in milliseconds

export const cleanUpTemporalUsers = () => {
  setInterval(async () => {
    try {
      // Cleanup logic
      const cutoffTime = new Date(Date.now() - 20 * 60 * 1000); // 1 hour ago
      const cutoffTimeString = cutoffTime.toISOString();
      if (!client) {
        throw new Error('DB client not initialized: Wrong credentials');
      }
      await client.execute({
        sql: 'DELETE FROM temporal_users WHERE datetime(created_at) < datetime(?);',
        args: [cutoffTimeString],
      });
      const cleaningTime = new Date();
      console.log('Cleanup successful.', cleaningTime);
    } catch (err) {
      // Log the error without stopping the cleanup process

      console.error('Error during cleanup:', err);
    }
  }, cleanupInterval);
};
