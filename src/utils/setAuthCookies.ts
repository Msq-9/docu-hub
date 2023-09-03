import config from 'config';
import { NextApiResponse } from 'next';

export default function (res: NextApiResponse, token: string) {
  const expiryTime = new Date(Date.now() + 3600 * 1000).toUTCString(); // set to expire in 1hr
  // Store auth token in cookies
  res.setHeader('Set-Cookie', [
    `${config.get(
      'authTokenCookieName'
    )}=${token}; HttpOnly; Secure=true; Path=/;expires=${expiryTime}` // Using httpOnly to restrict access to browser-side scripts for security reasons
  ]);
}
