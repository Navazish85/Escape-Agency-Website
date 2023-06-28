/* eslint-disable react/no-children-prop */
import useFirebase, { TNews } from '@/hooks/useFirebase';
import { Box, Heading, IconButton, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { BsTrash2Fill } from 'react-icons/bs';
import { useSWRConfig } from 'swr';
function News({
  news,
  isAdmin = false,
}: {
  news: Record<TNews, string>[];
  isAdmin?: boolean;
}) {
  const { deleteNews } = useFirebase();
  const { mutate } = useSWRConfig();
  const [deleting, setDeleting] = useState(false);
  return (
    <Box
      maxW="container.lg"
      // bg="white"
      w="full"
      borderRadius={'md'}
      p="2em"
      color={isAdmin ? 'black' : 'white'}
      m="auto"
    >
      <Heading as="h2" color="brand.blue" mb={4}>
        NEWS
      </Heading>
      <VStack w="full" h="full">
        {news && news.length > 0 ? (
          news.map((item, index) => (
            <Box
              key={index}
              pos={'relative'}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              w="full"
            >
              {isAdmin && (
                <IconButton
                  colorScheme="red"
                  size={'sm'}
                  pos={'absolute'}
                  top={2}
                  right={2}
                  aria-label="delete"
                  isLoading={deleting}
                  disabled={deleting}
                  onClick={async () => {
                    setDeleting(true);
                    await deleteNews(item)
                      .then(() => mutate('/api/news'))
                      .finally(() => setDeleting(false));
                  }}
                  children={<BsTrash2Fill />}
                />
              )}
              <Text fontWeight="bold" mb={2}>
                {item.title}
              </Text>
              <Box dangerouslySetInnerHTML={{ __html: item.description }} />
            </Box>
          ))
        ) : (
          <Box borderWidth="1px" borderRadius="lg" p={4}>
            <Text w="full" textAlign={'center'} fontWeight="bold" mb={2}>
              No news yet
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
export default News;
