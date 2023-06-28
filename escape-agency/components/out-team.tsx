/* eslint-disable react/no-children-prop */
import useFirebase, { TTeam, TTeamKey } from '@/hooks/useFirebase';
import {
  Box,
  Grid,
  GridItem,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsTrash2Fill } from 'react-icons/bs';
import { useSWRConfig } from 'swr';
function OurTeam({
  teams,
  isAdmin = false,
}: {
  teams: TTeam[];
  isAdmin?: boolean;
}) {
  return (
    // <Flex flexWrap="wrap" justifyContent="center" maxW="container.xl" mx="auto">
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
      maxW="container.xl"
      mx="auto"
    >
      {teams.map((member, idx) => (
        <GridItem key={idx} w="100%">
          <TeamCard member={member} isAdmin={isAdmin} />
        </GridItem>
      ))}
    </Grid>
    // </Flex>
  );
}

export const TeamCard = ({
  member,
  isAdmin,
}: {
  member: Record<TTeamKey, string>;
  isAdmin?: boolean;
}) => {
  const columnCount = useBreakpointValue({ base: 1, sm: 1, md: 1 });
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const { deleteTeam } = useFirebase();

  return (
    <Box
      key={member.id}
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      color={'black'}
      overflow="hidden"
      m={4}
      maxW="sm"
      width="100%"
      h={'20em'}
      // height={columnCount && `calc(100% / ${columnCount})`}
      flexBasis={columnCount && `calc(100% / ${columnCount})`}
      boxShadow="md"
      transition="transform 0.3s ease-out"
      _hover={{ transform: 'scale(1.05)' }}
      pos={'relative'}
    >
      {isAdmin && (
        <IconButton
          colorScheme="red"
          size={'sm'}
          pos={'absolute'}
          top={2}
          right={2}
          aria-label="delete"
          isLoading={loading}
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            await deleteTeam(member.id)
              .then(() => mutate('/api/team'))
              .finally(() => setLoading(false));
          }}
          children={<BsTrash2Fill />}
        />
      )}
      <Image
        src={member.img_url}
        alt={member.name}
        boxSize="100%"
        height={'75%'}
        objectFit="cover"
      />
      <Box p={4} minH="max-content">
        <Text fontWeight="bold" mb={2} fontSize="xl">
          {member.name}
        </Text>
        <Text color="gray.600" fontSize="sm">
          {member.role}
        </Text>
      </Box>
    </Box>
  );
};

export default OurTeam;
