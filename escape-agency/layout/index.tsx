/* eslint-disable react-hooks/rules-of-hooks */
import useFirebase from '@/hooks/useFirebase';
import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Footer from './footer';
import Header from './header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [bgUrl, setBgUrl] = useState('');
  useEffect(() => {
    (async () => {
      const { getHomePics } = useFirebase();
      const images = await getHomePics();
      setBgUrl(images.bg);
    })();
  }, []);

  return (
    <Box
      bg={`url(${bgUrl})`}
      backgroundPosition={'center'}
      backgroundSize={'cover'}
      backgroundRepeat={'no-repeat'}
      overflowY={'auto'}
      //   bg="brand.white"
      h="max-content"
      color="white"
      p={8}
      minH="100vh"
    >
      <Flex
        direction="column"
        align="center"
        maxW="container.lg"
        m="auto"
        py={8}
        mb="10em    "
      >
        <Header />

        {children}
      </Flex>
      <Footer />
    </Box>
  );
};
export async function getServerSideProps() {
  const { getNews } = useFirebase();
  const newsList = await getNews();
  console.log('newsList = ', newsList);
  return {
    props: {
      newsList,
    },
  };
}

export default Layout;
