import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined, CopyTwoTone } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

const LoginContainer = ({
  children
}: {
  children: JSX.Element;
}): JSX.Element => {
  return (
    <div className="bg-gray-100 my-52 mx-auto flex justify-center min-w-fit h-fit max-w-lg rounded-xl">
      <div className="m-auto px-8 py-5">
        <div
          className="text-5xl text-gray-800 font-semibold my-5 flex justify-center"
          style={{ fontFamily: 'fantasy' }}
        >
          DocuHub
        </div>
        {children}
      </div>
    </div>
  );
};

export default LoginContainer;
