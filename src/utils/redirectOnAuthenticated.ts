import { GetServerSidePropsContext } from 'next';
import config from 'config';
import AuthClient from '@clients/auth';
import isAuthenticated from './isAuthenticated';

const redirectOnAuthenticated = async (ctx: GetServerSidePropsContext) => {
  const ssProps = await isAuthenticated(ctx);

  if (ssProps?.props?.user) {
    return {
      redirect: {
        destination: '/documents'
      }
    };
  }
  return { props: {} };
};

export default redirectOnAuthenticated;
