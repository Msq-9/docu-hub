import React, { useCallback, useEffect, useState } from 'react';
import { LockOutlined, UserOutlined, CopyTwoTone } from '@ant-design/icons';
import { Alert, Button, Form, Input } from 'antd';
import { LoginFormValues } from '../../pages/login';

const LoginForm = ({
  onSubmit
}: {
  onSubmit: (
    formValues: LoginFormValues,
    sethasError: Function,
    setLoginErrorMsg: Function
  ) => void;
}): JSX.Element => {
  const [hasError, sethasError] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState('');

  return (
    <div className="bg-gray-100 my-52 mx-auto flex justify-center min-w-fit h-fit max-w-lg rounded-xl">
      <div className="m-auto px-8 py-5">
        <div
          className="text-5xl text-gray-800 font-semibold my-5 flex justify-center"
          style={{ fontFamily: 'fantasy' }}
        >
          DocuHub
        </div>
        {hasError && <Alert message={loginErrorMsg} type="error" showIcon />}
        <Form
          name="normal_login"
          className="w-80 lg:w-96 "
          initialValues={{ remember: true }}
          onFinish={(values) => {
            onSubmit(values, sethasError, setLoginErrorMsg);
          }}
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
              <a className="float-left rtl:float-right" href="/register">
                Register now!
              </a>
              <a className="float-right rtl:float-left" href="">
                Forgot password?
              </a>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
