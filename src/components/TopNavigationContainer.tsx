import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Popover } from 'antd';
import React from 'react';

const TopNavigationContainer = ({
  children
}: {
  children?: JSX.Element;
}): JSX.Element => {
  return (
    <div className="bg-black h-36 mb-5 sticky z-10 top-0 lg:h-24 overflow-auto">
      <div className="m-12 lg:m-6 float-right">
        <Popover
          arrow={false}
          placement="bottomRight"
          content={
            <div className="w-fit flex flex-col">
              <Button
                size={'large'}
                type="link"
                danger
                icon={<PoweroffOutlined />}
                onClick={() => {}}
              >
                {'Log out'}
              </Button>
            </div>
          }
          trigger="click"
        >
          <Avatar
            className="bg-gray-500 h-10 w-10"
            icon={
              <div className="flex justify-center m-2">
                <UserOutlined className="text-xl" />
              </div>
            }
          />
        </Popover>
      </div>
      {children}
    </div>
  );
};

export default TopNavigationContainer;
