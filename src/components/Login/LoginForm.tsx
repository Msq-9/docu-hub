import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined, CopyTwoTone } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import LoginContainer from './LoginContainer';

const LoginForm = ({ onSubmit }: { onSubmit: (values: any) => void }) => {
  return (
    <LoginContainer>
      <Form
        name="normal_login"
        className="w-80 lg:w-96 "
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Username is required!' }]}
        >
          <Input
            prefix={<UserOutlined className="pr-1" />}
            placeholder="Username"
            className="mt-5"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Password is required!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="pr-1" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="mt-5 w-full">
            Log in
          </Button>
          <Form.Item>
            <a className="float-left rtl:float-right" href="/login/register">
              Register now!
            </a>
            <a className="float-right rtl:float-left" href="">
              Forgot password?
            </a>
          </Form.Item>
        </Form.Item>
      </Form>
    </LoginContainer>
  );
};

export default LoginForm;
