import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import RegisterForm from '@components/Login/RegisterForm';

const Login = () => {
  const onSubmit = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return <RegisterForm onSubmit={onSubmit} />;
};

export default Login;
