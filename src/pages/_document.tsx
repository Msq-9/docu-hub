import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import type { DocumentContext, DocumentInitialProps } from 'next/document';

const MyDocument = (): JSX.Element => (
  <Html lang="en">
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentInitialProps> => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = async () =>
    await originalRenderPage({
      enhanceApp: (App) => (props) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      )
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    )
  };
};

export default MyDocument;
