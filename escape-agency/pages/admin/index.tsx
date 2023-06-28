/* eslint-disable react-hooks/rules-of-hooks */
import Admin from '@/components/admin/admin';
import useFirebase, { TImage } from '@/hooks/useFirebase';

const AdminPage = ({ images }: { images: Record<TImage, string> }) => {
  return <Admin images={images} />;
};

export default AdminPage;

export async function getServerSideProps() {
  const { getHomePics } = useFirebase();
  const images = await getHomePics();
  return {
    props: {
      images,
    },
  };
}
