/* eslint-disable react-hooks/rules-of-hooks */
import OurTeam from '@/components/out-team';
import useFirebase from '@/hooks/useFirebase';
import Layout from '@/layout';
import swr from 'swr';
const OurTeamPage = () => {
  const { getTeams } = useFirebase();

  const { isLoading, data } = swr('/api/team', async () => await getTeams());

  return <Layout>{data && <OurTeam teams={data} />}</Layout>;
};

export default OurTeamPage;

// export async function getServerSideProps() {
//   const { getTeams } = useFirebase();
//   const teams = await getTeams();
//   return {
//     props: {
//       teams,
//     },
//   };
// }
