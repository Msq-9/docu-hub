import React, { useEffect, useState } from 'react';
import { Button, List } from 'antd';
import { FileAddTwoTone } from '@ant-design/icons';

const CreateDocument = (): JSX.Element => {
  return (
    <div className="flex flex-row mx-10 px-10 rounded-xl">
      <Button
        className="bg-gray-100 my-10"
        shape="round"
        size="large"
        icon={<FileAddTwoTone />}
        onClick={() => {}}
      >
        Create document
      </Button>
    </div>
  );
};

export default CreateDocument;
