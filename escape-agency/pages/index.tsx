/* eslint-disable react-hooks/rules-of-hooks */
import Home from '@/components/home';
import useFirebase, { TImage, TNews } from '@/hooks/useFirebase';
import Layout from '@/layout';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function HomePage({
  images,
  newsList,
}: {
  images: Record<TImage, string>;
  newsList: Record<TNews, string>[];
}) {
  return (
    <>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      {/* <main className={`${styles.main} ${inter.className}`}>
        <Text>Hello</Text>
      </main> */}
      <Layout>
        <Home images={images} newsList={newsList} />
      </Layout>
    </>
  );
}

export default HomePage;
export async function getServerSideProps() {
  const { getHomePics, getNews } = useFirebase();
  const newsList = await getNews();

  const images = await getHomePics();

  return {
    props: {
      images,
      newsList,
    },
  };
}
