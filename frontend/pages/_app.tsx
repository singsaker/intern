import { client } from '@api/apolloClient';
import { AuthProvider } from '@api/authentication';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}
export default MyApp
