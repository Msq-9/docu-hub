import config from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import AuthClient from '@clients/auth';
import setAuthCookies from '@utils/setAuthCookies';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const authClient = new AuthClient();
  try {
    const registerRes = await authClient.register(
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.password
    );

    if (registerRes.token) {
      // Store auth token in cookies
      setAuthCookies({ res, token: registerRes.token });
      return res.status(200).json(registerRes);
    }

    return res
      .status(400)
      .json({ message: registerRes.message || 'Unable to register user' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Unable to register user' });
  }
};
