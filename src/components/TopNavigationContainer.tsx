import {
  HomeOutlined,
  PoweroffOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useApolloClient, useQuery } from '@apollo/client';
import { Alert, Avatar, Button, Popover } from 'antd';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

const TopNavigationContainer = ({
  children
}: {
  children?: JSX.Element;
}): JSX.Element => {
  const client = useApolloClient();
  const router = useRouter();
  const [showError, setHasError] = useState(false);

  const onLogOut = useCallback(async () => {
    try {
      await fetch('/api/logout');
      client.resetStore();
    } catch {
      setHasError(true);
    }
  }, [client, router]);

  return (
    <div>
      {showError && (
        <Alert
          message="Unable to log out at the moment, please try again!"
          banner
          closable
        />
      )}
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
                  onClick={onLogOut}
                >
                  {'Log out'}
                </Button>
              </div>
            }
            trigger="click"
          >
            <button>
              <Avatar
                className="bg-gray-500 h-10 w-10"
                icon={
                  <div className="flex justify-center m-2">
                    <UserOutlined className="text-xl" />
                  </div>
                }
              />
            </button>
          </Popover>
        </div>
        <div className="m-12 lg:m-6 float-left">
          <button>
            <Avatar
              shape={'circle'}
              className="bg-gray-500 h-10 w-10"
              icon={
                <div className="flex justify-center m-2">
                  <HomeOutlined className="text-xl" />
                </div>
              }
              onClick={() => {
                router.push('/documents');
              }}
            />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default TopNavigationContainer;
