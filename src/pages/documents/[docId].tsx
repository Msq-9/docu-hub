import Editor from '@components/RichTextEditor/Editor';
import { useRouter } from 'next/router';
import React from 'react';

const Document = (): JSX.Element => {
  const router = useRouter();
  const { docId } = router.query;

  console.log('document id: ', docId);

  return <Editor />;
};

export default Document;
