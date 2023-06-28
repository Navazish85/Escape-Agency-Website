/* eslint-disable react-hooks/rules-of-hooks */
import News from '@/components/news';
import useFirebase, { TNews } from '@/hooks/useFirebase';
import Layout from '@/layout';

const NewsPage = ({ newsList }: { newsList: Record<TNews, string>[] }) => {
  return (
    <Layout>
      <News news={newsList} />
    </Layout>
  );
};

export default NewsPage;

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
