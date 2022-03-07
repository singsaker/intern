import { client } from '@api/apolloClient';
import { AuthProvider } from '@api/authentication';
import { ApolloProvider } from '@apollo/client';
import { CacheProvider, EmotionCache } from '@emotion/react';
import ThemeConfig from "@theme/index";
import createEmotionCache from '@utils/createEmotionCache';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <AuthProvider>
          <CacheProvider value={emotionCache}>
            <ThemeConfig>
              {getLayout(<Component {...pageProps} />)}
            </ThemeConfig>
          </CacheProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}
