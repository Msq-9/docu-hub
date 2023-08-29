import React from 'react';
import RegistrationForm from '@components/Login/RegistrationForm';

const Register = (): JSX.Element => {
  const onSubmit = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return <RegistrationForm onSubmit={onSubmit} />;
};

export default Register;
