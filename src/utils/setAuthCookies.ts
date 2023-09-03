import config from 'config';
import { NextApiResponse } from 'next';

export default function ({
  res,
  token,
  deleteCookie
}: {
  res: NextApiResponse;
  token?: string;
  deleteCookie?: boolean;
}) {
  const expiryTime = new Date(Date.now() + 3600 * 1000).toUTCString(); // set to expire in 1hr
  const deleteTime = new Date(Date.now() - 3600 * 1000).toUTCString(); // set to expire immediately

  const expiresIn = deleteCookie ? deleteTime : expiryTime;

  // Store auth token in cookies
  res.setHeader('Set-Cookie', [
    `${config.get(
      'authTokenCookieName'
    )}=${token}; HttpOnly; Secure=true; Path=/;expires=${expiresIn}` // Using httpOnly to restrict access to browser-side scripts for security reasons
  ]);
}
