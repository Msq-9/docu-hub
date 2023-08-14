import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import LoginForm from '@components/Login/LoginForm';

const Login = () => {
  const onSubmit = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return <LoginForm onSubmit={onSubmit} />;
};

export default Login;
