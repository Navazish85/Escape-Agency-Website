import '@/styles/globals.css';
// pages/_app.js
import { ChakraProvider, theme } from '@chakra-ui/react';
import NextNProgress from 'nextjs-progressbar';
import 'react-slideshow-image/dist/styles.css';

// 1. Import the extendTheme function
import { AppProps } from 'next/app';
import Head from 'next/head';

// 3. Pass the `theme` prop to the `ChakraProvider`
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ESCAPE AGENCY</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <ChakraProvider theme={theme}>
        <NextNProgress options={{ showSpinner: false }} />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
