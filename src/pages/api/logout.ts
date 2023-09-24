import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import setAuthCookies from '@utils/setAuthCookies';

const { publicRuntimeConfig } = getConfig();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const expiryTime = new Date(Date.now() - 3600 * 1000).toUTCString(); // setting expiry time to 1hr before current time
    // Delete auth token stored in cookies
    res.setHeader('Set-Cookie', [
      `${publicRuntimeConfig.authTokenCookieName}=; HttpOnly; Path=/;expires=${expiryTime}` // Using httpOnly to restrict access to browser-side scripts for security reasons
    ]);

    setAuthCookies({ res, deleteCookie: true });

    return res.status(200).json({ message: 'logout successful' });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Unable to login! Please try again' });
  }
};
