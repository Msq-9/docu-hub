import Editor from '@components/RichTextEditor/Editor';
import { useRouter } from 'next/router';
import React from 'react';

import { GetServerSidePropsContext } from 'next';
import isAuthenticated from '@utils/isAuthenticated';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return isAuthenticated(ctx);
};

const Document = (): JSX.Element => {
  const router = useRouter();
  const { docId } = router.query;

  console.log('document id: ', docId);

  return <Editor />;
};

export default Document;
