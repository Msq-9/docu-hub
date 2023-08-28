import { GetServerSidePropsContext } from 'next';
import config from 'config';
import AuthClient from '@clients/auth';

const isAuthenticated = async (ctx: GetServerSidePropsContext) => {
  const { req, res } = ctx;
  const authCookieName: string = config.get('authTokenCookieName');
  const authToken = req.cookies[authCookieName];
  const authClient = new AuthClient();
  try {
    const user = await authClient.validateToken(authToken || '');
    if (!user) {
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
