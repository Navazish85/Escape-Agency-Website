/* eslint-disable react-hooks/rules-of-hooks */
import OurTalents from '@/components/talent';
import useFirebase, { TPlayerList } from '@/hooks/useFirebase';
import Layout from '@/layout';

const TalentPage = ({ players }: { players: TPlayerList }) => {
  return (
    <Layout>
      <OurTalents players={players} />
    </Layout>
  );
};

export default TalentPage;

export async function getServerSideProps() {
  const { getPlayers } = useFirebase();
  const players = await getPlayers();
  return {
    props: {
      players,
    },
  };
}
