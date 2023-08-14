import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import theme from '../theme/themeConfig'; // antd theme config
import 'tailwindcss/tailwind.css';
import '@styles/stylesglobals.css';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache()
});

const DocuHub = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ConfigProvider theme={theme}>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  </ConfigProvider>
);

export default DocuHub;
