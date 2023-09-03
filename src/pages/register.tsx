import React, { useCallback } from 'react';
import RegistrationForm from '@components/login/RegistrationForm';
import { GetServerSidePropsContext } from 'next';
import redirectOnAuthenticated from '@utils/redirectOnAuthenticated';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return redirectOnAuthenticated(ctx);
};

const Register = (): JSX.Element => {
  return <RegistrationForm />;
};

export default Register;
