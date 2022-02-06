import { client } from '@api/apolloClient';
import { AuthProvider } from '@api/authentication';
import { UserProvider } from '@api/UserProvider';
import { ApolloProvider } from '@apollo/client';
import { CacheProvider, EmotionCache } from '@emotion/react';
import ThemeConfig from "@theme/index";
import createEmotionCache from '@utils/createEmotionCache';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  Component: NextPage;
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <AuthProvider>
          <UserProvider>
            <CacheProvider value={emotionCache}>
              <ThemeConfig>
                <Component {...pageProps} />
              </ThemeConfig>
            </CacheProvider>
          </UserProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}
