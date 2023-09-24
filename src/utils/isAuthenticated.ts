import { GetServerSidePropsContext } from 'next';
import AuthClient from '@clients/auth';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const isAuthenticated = async (ctx: GetServerSidePropsContext) => {
  const { req, res } = ctx;
  const authCookieName: string =
    publicRuntimeConfig.authTokenCookieName as string;
  const authToken = req.cookies[authCookieName];
  const authClient = new AuthClient();
  try {
    const user = await authClient.validateToken(authToken || '');
    if (!user.token) {
      return {
        redirect: {
          destination: '/login'
        }
      };
    }

    // Set httpOnly auth cookie so that graphql server can authorize requests
    res.setHeader('Set-Cookie', [
      `${authCookieName}=${authToken}; HttpOnly; Path=/;`
    ]);

    return { props: { user } };
  } catch (err) {
    return {
      redirect: {
        destination: '/login'
      }
    };
  }
};

export default isAuthenticated;
