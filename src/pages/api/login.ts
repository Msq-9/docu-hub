import config from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import AuthClient from '@clients/auth';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const authClient = new AuthClient();
  try {
    const loginRes = await authClient.login(
      req.body.username,
      req.body.password
    );

    if (loginRes.token) {
      // Store auth token in cookies
      res.setHeader('Set-Cookie', [
        `${config.get('authTokenCookieName')}=${
          loginRes.token
        }; HttpOnly; Path=/;` // Using httpOnly to restrict access to browser-side scripts for security reasons
      ]);

      return res.status(200).json(loginRes);
    }

    return res.status(400).json({ message: loginRes.message });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Cannot login user' });
  }
};
