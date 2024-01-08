import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error('JWT Secret key is not matched');
  }
  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: any) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getUserId() {
  const cookieStore = cookies();
  const user = cookieStore.get('access-token');
  let userID: string = '';
  if (user) {
    const cookiePairs = user.value.split('; ');
    const tokenPair = cookiePairs.find((pair) =>
      pair.startsWith('access-token=')
    );

    // Gets token from cookie
    if (tokenPair) {
      const token = tokenPair.split('=')[1];
      const verified = await verifyJwtToken(token);
      userID = verified?.id?.toString() || '';
    }
  }
  return userID;
}
