import React, { useEffect, useState } from 'react';
import { Button, List } from 'antd';
import { FileAddTwoTone } from '@ant-design/icons';
import { createRichTextDocument } from '@operations/document';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const CreateDocument = (): JSX.Element => {
  const router = useRouter();
  const [createNewDocument, { loading }] = useMutation(createRichTextDocument);

  return (
    <div className="flex flex-row mx-10 px-10 rounded-xl">
      <Button
        className="bg-gray-100 my-10"
        shape="round"
        size="large"
        loading={loading}
        icon={<FileAddTwoTone />}
        onClick={async () => {
          const newDocument = await createNewDocument({
            variables: { documentInput: { title: 'New Document' } }
          });
          router.push(`/documents/${newDocument.data.createDocument.id}`);
        }}
      >
        Create document
      </Button>
    </div>
  );
};

export default CreateDocument;
