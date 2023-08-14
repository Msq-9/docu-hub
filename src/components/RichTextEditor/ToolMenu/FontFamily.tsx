import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography } from 'antd';
import { type Editor } from '@tiptap/react';

const fontFamilies = ['Arial', 'Comic Sans', 'Serif', 'Monospace', 'Cursive'];

const FontFamily = ({ editor }: { editor: Editor | null }) => {
  const [currFont, setCurrFont] = useState<number>(1);

  const onMenuClick = (menuInfo: any) => {
    console.log(menuInfo);
    if (editor) {
      editor
        .chain()
        .focus()
        .setFontFamily(fontFamilies[menuInfo.key - 1])
        .run();
    }
    setCurrFont(menuInfo.key);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Arial',
      onClick: onMenuClick
    },
    {
      key: '2',
      label: 'Comic Sans',
      onClick: onMenuClick
    },
    {
      key: '3',
      label: 'Serif',
      onClick: onMenuClick
    },
    {
      key: '4',
      label: 'Monospace',
      onClick: onMenuClick
    },
    {
      key: '5',
      label: 'Cursive',
      onClick: onMenuClick
    }
  ];

  return (
    <>
      <Dropdown
        menu={{
          items,
          selectable: true
        }}
      >
        <Typography.Link>
          <Space>
            <div>{fontFamilies[currFont - 1]}</div>
            <DownOutlined />
          </Space>
        </Typography.Link>
      </Dropdown>
    </>
  );
};

export default FontFamily;
