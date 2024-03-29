'use server';

import { verifyJwtToken } from '../auth';

export const getTokenInfo = async (token: string) => {
  const verified = await verifyJwtToken(token);
  if (!verified) {
    console.log('Token not found or invalid');
    return null;
  }
  const userData = {
    id: verified?.id?.toString() || '',
    name: verified?.name?.toString() || '',
    email: verified?.email?.toString() || '',
    avatar: verified?.avatar?.toString() || '',
  };
  return userData;
};
