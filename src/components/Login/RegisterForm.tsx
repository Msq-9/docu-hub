import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined, CopyTwoTone } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import LoginContainer from './LoginContainer';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const LoginForm = ({ onSubmit }: { onSubmit: (values: any) => void }) => {
  const [form] = Form.useForm();
  return (
    <LoginContainer>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onSubmit}
        initialValues={{}}
        className="w-regForm"
        scrollToFirstError
      >
        <div style={{}}>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'Please enter a valid E-mail!'
              },
              {
                required: true,
                message: 'E-mail is required!'
              }
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Password is required!'
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                );
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </LoginContainer>
  );
};

export default LoginForm;
