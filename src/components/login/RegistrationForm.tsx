import React, { useCallback, useState } from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { useRouter } from 'next/router';

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

const RegistrationForm = () => {
  const [form] = Form.useForm();
  // Watch all form values
  const values = Form.useWatch([], form);

  const router = useRouter();
  const [hasError, sethasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setEnableSubmit(true);
      },
      () => {
        setEnableSubmit(false);
      }
    );
  }, [values]);

  const onSubmit = useCallback(async (values: Record<string, string>) => {
    const res = await fetch('api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password
      })
    });

    const resBody = await res.json();

    if (res.status === 200) {
      sethasError(false);
      router.push('/documents');
    } else if (res.status === 400) {
      sethasError(true);
      setErrorMsg(resBody?.message);
    } else {
      sethasError(true);
      setErrorMsg('Unable to register! Please try again.');
    }
  }, []);

  return (
    <div className="bg-gray-100 my-52 mx-auto flex justify-center min-w-fit h-fit max-w-2xl rounded-xl">
      <div className="m-auto px-8 py-5">
        <div
          className="text-5xl text-gray-800 font-semibold my-5 flex justify-center"
          style={{ fontFamily: 'fantasy' }}
        >
          DocuHub
        </div>
        {hasError && (
          <Alert message={errorMsg} type="error" showIcon className="mb-5" />
        )}
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={(values) => {
            setLoading(true);
            onSubmit(values);
          }}
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
            <Button
              type="primary"
              htmlType="submit"
              disabled={!enableSubmit}
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationForm;
