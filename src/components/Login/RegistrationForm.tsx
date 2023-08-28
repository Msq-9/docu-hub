import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined, CopyTwoTone } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

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

const RegistrationForm = ({
  onSubmit
}: {
  onSubmit: (values: any) => void;
}) => {
  const [form] = Form.useForm();
  return (
    <div className="bg-gray-100 my-52 mx-auto flex justify-center min-w-fit h-fit max-w-2xl rounded-xl">
      <div className="m-auto px-8 py-5">
        <div
          className="text-5xl text-gray-800 font-semibold my-5 flex justify-center"
          style={{ fontFamily: 'fantasy' }}
        >
          DocuHub
        </div>

        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onSubmit}
          initialValues={{}}
          className="w-regForm"
          scrollToFirstError
        >
          <Form.Item
            name="firstname"
            label="Firstname"
            rules={[
              {
                required: true,
                message: 'First name is required!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Lastname"
            rules={[
              {
                required: true,
                message: 'Last name is required!'
              }
            ]}
          >
            <Input />
          </Form.Item>
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
      </div>
    </div>
  );
};

export default RegistrationForm;
