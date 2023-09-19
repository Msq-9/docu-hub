import Editor from '@components/richTextEditor/Editor';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { GetServerSidePropsContext } from 'next';
import isAuthenticated from '@utils/isAuthenticated';
import { getDocumentById } from '@operations/document';
import { useQuery } from '@apollo/client';
import { Spin } from 'antd';
import { getUserQuery } from '@operations/user';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return isAuthenticated(ctx);
};

const Document = (): JSX.Element => {
  const router = useRouter();
  const { documentId } = router.query;

  const { data, loading } = useQuery(getDocumentById, {
    variables: { documentId }
  });

  const { data: userData, loading: loadingUserData } = useQuery(getUserQuery, {
    variables: { addAuth: true }
  });

  if (loading || !data || !userData || loadingUserData) {
    return (
      <div className="my-80">
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </div>
    );
  }

  return <Editor documentData={data.document} userData={userData.user} />;
};

export default Document;
