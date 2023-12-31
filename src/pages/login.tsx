import React, { useCallback } from 'react';
import LoginForm from '@components/login/LoginForm';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import redirectOnAuthenticated from '@utils/redirectOnAuthenticated';

export type LoginFormValues = { username: string; password: string };

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return redirectOnAuthenticated(ctx);
};

const Login = () => {
  const router = useRouter();
  const onSubmit = useCallback(
    async (
      formValues: LoginFormValues,
      sethasError: Function,
      setLoginErrorMsg: Function
    ) => {
      try {
        const loginRes = await fetch('api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues)
        });

        const resBody = await loginRes.json();

        if (loginRes.status === 200) {
          sethasError(false);
          router.push('/documents');
        } else {
          sethasError(true);
          setLoginErrorMsg(resBody?.message);
        }
      } catch (err) {
        console.log('Unable to process login request: ', err);
        sethasError(true);
        setLoginErrorMsg('Unable to login! Please try again.');
      }
    },
    []
  );
  return <LoginForm onSubmit={onSubmit} />;
};

export default Login;
