import React, { useState } from 'react';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography } from 'antd';
import { type Editor } from '@tiptap/react';
import { Level } from '@tiptap/extension-heading';

const headingLabelMapping = [
  'Normal',
  'Heading 1',
  'Heading 2',
  'Heading 3',
  'Heading 4',
  'Heading 5',
  'Heading 6'
];

const NormalText = ({ level }: { level: number }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MenuOutlined style={{ padding: '0px 10px 0px 4px' }} />
      <div> {headingLabelMapping[level]}</div>
    </div>
  );
};

const Heading = ({ level }: { level: number }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          paddingRight: level == 1 ? `${7 + level}px` : `${6 + level}px`,
          fontSize: `${18 - level}px`,
          margin: 'auto'
        }}
      >
        {`H${level}`}
      </div>
      <div
        style={{
          paddingRight: level == 1 ? '2px' : '0px'
        }}
      >
        {headingLabelMapping[level]}
      </div>
    </div>
  );
};

const HeadingMenu = ({ editor }: { editor: Editor | null }) => {
  const [currHeading, setCurrHeading] = useState<number>(0);

  const onMenuClick = (menuInfo: any) => {
    if (editor) {
      if (menuInfo.key === '1') {
        editor.chain().focus().setParagraph().run();
      } else {
        editor
          .chain()
          .focus()
          .toggleHeading({ level: (menuInfo.key - 1) as Level })
          .run();
      }
    }
    setCurrHeading(menuInfo.key - 1);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <NormalText level={0} />,
      onClick: onMenuClick
    },
    {
      key: '2',
      label: <Heading level={1} />,
      onClick: onMenuClick
    },
    {
      key: '3',
      label: <Heading level={2} />,
      onClick: onMenuClick
    },
    {
      key: '4',
      label: <Heading level={3} />,
      onClick: onMenuClick
    },
    {
      key: '5',
      label: <Heading level={4} />,
      onClick: onMenuClick
    },
    {
      key: '6',
      label: <Heading level={5} />,
      onClick: onMenuClick
    },
    {
      key: '7',
      label: <Heading level={6} />,
      onClick: onMenuClick
    }
  ];

  return (
    <>
      <Dropdown
        menu={{
          items,
          selectable: true,
          defaultSelectedKeys: ['1']
        }}
      >
        <Typography.Link>
          <Space>
            <div>
              {currHeading === 0 ? 'Normal text' : `Heading ${currHeading}`}
            </div>
            <DownOutlined />
          </Space>
        </Typography.Link>
      </Dropdown>
    </>
  );
};

export default HeadingMenu;
