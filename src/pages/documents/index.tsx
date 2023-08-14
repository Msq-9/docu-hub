import CreateDocument from '@components/CreateDocument';
import DocumentList from '@components/DocumentList';
import TopNavigationContainer from '@components/TopNavigationContainer';
import React from 'react';

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
