import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import theme from '../theme/themeConfig'; // antd theme config
import 'tailwindcss/tailwind.css';
import '@styles/stylesglobals.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink
} from '@apollo/client';

const createGraphqlClient = () => {
  const GqlServerLink = new HttpLink({
    uri: '/api/graphql',
    credentials: 'include'
  });

  return new ApolloClient({
    link: GqlServerLink,
    cache: new InMemoryCache()
  });
};

const DocuHub = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ConfigProvider theme={theme}>
    <ApolloProvider client={createGraphqlClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  </ConfigProvider>
);

export default DocuHub;
