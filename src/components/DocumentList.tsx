import { MoreOutlined } from '@ant-design/icons';
import { Space, Table, Dropdown } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  name: string;
  ownedBy: string;
  updatedAt: string;
  description: string;
}

const items = [
  { key: '1', label: 'Edit' },
  { key: '2', label: 'Share' },
  { key: '3', label: 'Delete', danger: true }
];

const columns: ColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Owned by', dataIndex: 'ownedBy', key: 'ownedBy', width: '25%' },
  {
    title: 'Last opened',
    dataIndex: 'updatedAt',
    key: 'address',
    width: '25%'
  },
  {
    title: 'More',
    dataIndex: 'operation',
    key: 'operation',
    width: '10%',
    render: () => (
      <Space size="middle">
        <Dropdown menu={{ items }}>
          <a>
            <MoreOutlined className="text-xl" />
          </a>
        </Dropdown>
      </Space>
    )
  }
];

const data: DataType[] = [
  {
    key: 1,
    name: 'Document 1',
    ownedBy: 'Manoj',
    updatedAt: new Date().toDateString(),
    description:
      'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
  },
  {
    key: 2,
    name: 'Document 2',
    ownedBy: 'Manoj',
    updatedAt: new Date().toDateString(),
    description:
      'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
  },
  {
    key: 3,
    name: 'Document 3',
    ownedBy: 'Manoj',
    updatedAt: new Date().toDateString(),
    description: 'This not expandable'
  },
  {
    key: 4,
    name: 'Document 4',
    ownedBy: 'Manoj',
    updatedAt: new Date().toDateString(),
    description:
      'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.'
  },
  {
    key: 1,
    name: 'Document 1',
    ownedBy: 'Manoj',
    updatedAt: new Date().toDateString(),
    description:
      'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
  },
  {
    key: 2,
    name: 'Document 2',
    ownedBy: 'Manoj',
    updatedAt: new Date().toDateString(),
    description:
      'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
  },
  {
    key: 3,
    name: 'Document 3',
    ownedBy: 'Manoj',
    updatedAt: new Date().toDateString(),
    description: 'This not expandable'
  },
  {
    key: 4,
    name: 'Document 4',
    ownedBy: 'Manoj',
    updatedAt: new Date().toDateString(),
    description:
      'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.'
  }
];

const DocumentList = (): JSX.Element => {
  return (
    <div className="mx-10 px-10">
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          rowExpandable: (record) => record.name !== 'Not Expandable'
        }}
        dataSource={data}
      />
    </div>
  );
};

export default DocumentList;
