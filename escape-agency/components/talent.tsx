/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import useFirebase, { TPlayerList } from '@/hooks/useFirebase';
import { Grid, GridItem } from '@chakra-ui/react';
import { BsTrash2Fill } from 'react-icons/bs';
import { useSWRConfig } from 'swr';

function OurTalents({
  players,
  isAdmin = false,
}: {
  players: TPlayerList;
  isAdmin?: boolean;
}) {
  const [expandedPlayerId, setExpandedPlayerId] = useState<number | null>(null);
  const { mutate } = useSWRConfig();
  const [deleting, setDeleting] = useState(false);
  const { deletePlayer } = useFirebase();
  const togglePlayerExpansion = (id: number) => {
    if (expandedPlayerId === id) {
      setExpandedPlayerId(null);
    } else {
      setExpandedPlayerId(id);
    }
  };

  return (
    <Box maxW="container.lg" m="auto" w={'full'} color="black">
      <Heading as="h2" color="brand.blue" mb={4}>
        OUR PLAYERS
      </Heading>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={6}
        w={'full'}
      >
        {players && players.length > 0 ? (
          players.map((player, idx) => (
            <GridItem w="100%" key={idx}>
              <Box
                pos={'relative'}
                mb={4}
                maxW={{ base: '100%', md: '800px' }}
                flex={1}
                p={4}
              >
                {isAdmin && (
                  <IconButton
                    colorScheme="red"
                    size={'sm'}
                    pos={'absolute'}
                    top={5}
                    right={5}
                    aria-label="delete"
                    isLoading={deleting}
                    disabled={deleting}
                    onClick={async () => {
                      setDeleting(true);
                      await deletePlayer(player.id)
                        .then(() => mutate('/api/player'))
                        .finally(() => setDeleting(false));
                    }}
                    children={<BsTrash2Fill />}
                  />
                )}
                <Flex
                  direction="column"
                  align="center"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  h="100%"
                  w={'full'}
                  bg="white"
                >
                  <Image
                    src={player.image1}
                    alt={player.name}
                    // boxSize={200}
                    objectFit="cover"
                  />
                  <Box p={4} flex={1} w="full">
                    <Text fontWeight="bold" mb={2}>
                      {player.name}
                    </Text>
                    <Text color="gray.500" mb={2}>
                      {player.country} / {player.age} years old
                    </Text>
                    <Collapse in={expandedPlayerId === idx} animateOpacity>
                      <Text mb={2}>{player.bio}</Text>
                      <Flex mb={2}>
                        <Image
                          src={player.image1}
                          alt={player.name}
                          boxSize={50}
                          objectFit="cover"
                          mr={2}
                        />
                        {player.image2 && (
                          <Image
                            src={player.image2}
                            alt={player.name}
                            boxSize={50}
                            objectFit="cover"
                            mr={2}
                          />
                        )}
                      </Flex>
                      <Box mb={2} w={'full'}>
                        <video
                          controls
                          style={{
                            width: '100%',
                          }}
                        >
                          <source
                            src={'https://www.youtube.com/watch?v=up74xBlpe7U'}
                            type="video/mp4"
                          />
                        </video>
                      </Box>
                    </Collapse>
                    <Flex justify="flex-end" minW={'full'} mt={4}>
                      <Button
                        colorScheme="brand"
                        variant="outline"
                        size="sm"
                        onClick={() => togglePlayerExpansion(idx)}
                      >
                        {expandedPlayerId === idx ? 'Show Less' : 'Read More'}
                      </Button>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            </GridItem>
          ))
        ) : (
          <GridItem colSpan={2}>
            <Box borderWidth="1px" w="full" borderRadius="lg" p={4}>
              <Text w="full" textAlign={'center'} fontWeight="bold" mb={2}>
                No Players Found
              </Text>
            </Box>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
}

export default OurTalents;
