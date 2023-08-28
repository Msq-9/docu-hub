import CreateDocument from '@components/CreateDocument';
import DocumentList from '@components/DocumentList';
import TopNavigationContainer from '@components/TopNavigationContainer';
import React from 'react';

import { GetServerSidePropsContext } from 'next';
import isAuthenticated from '@utils/isAuthenticated';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return isAuthenticated(ctx);
};

const App = (): JSX.Element => {
  return (
    <div>
      <TopNavigationContainer />
      <CreateDocument />
      <DocumentList />
    </div>
  );
};

export default App;
