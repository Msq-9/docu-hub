import React from 'react';
import RegistrationForm from '@components/Login/RegistrationForm';
import { useQuery } from '@apollo/client';
import { getUser } from '@operations/user';

const Register = (): JSX.Element => {
  const { data } = useQuery(getUser, {
    variables: { userId: 'mmenpadi1' },
    onError(error) {
      console.log(error);
    }
  });
  console.log('mmenpadi1 data:', data);

  const onSubmit = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return <RegistrationForm onSubmit={onSubmit} />;
};

export default Register;
