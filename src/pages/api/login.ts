import config from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import AuthClient from '@clients/auth';
import setAuthCookies from '@utils/setAuthCookies';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const authClient = new AuthClient();
  try {
    const loginRes = await authClient.login(
      req.body.username,
      req.body.password
    );

    if (loginRes.token) {
      // Store auth token in cookies
      setAuthCookies({ res, token: loginRes.token });
      return res.status(200).json(loginRes);
    }

    return res.status(400).json({ message: loginRes.message });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Unable to login! Please try again' });
  }
};
