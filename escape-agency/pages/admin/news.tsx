/* eslint-disable react-hooks/rules-of-hooks */
import AddNewsForm from '@/components/admin/add-news';
import { AdminHeader } from '@/components/admin/admin';
import News from '@/components/news';
import useFirebase, { TNews } from '@/hooks/useFirebase';
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import swr, { useSWRConfig } from 'swr';
const AdminNewsPage = () => {
  const { getNews } = useFirebase();
  const { mutate } = useSWRConfig();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [news, setNews] = useState<Record<TNews, string>[]>([]);
  const [newNews, setNewNews] = useState<Record<TNews, string>>({
    title: '',
    description: '',
  });

  const { isLoading } = swr('/api/news', async () => await getNews(), {
    onSuccess: (data) => {
      setNews(data);
    },
  });

  const [loading, setLoading] = useState({
    add: false,
    update: false,
    delete: false,
  });

  const { handleSubmitNews } = useFirebase();

  // Function to handle form submission
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setNews((prevNews) => [...prevNews, newNews]);

    setLoading((prevLoading) => ({ ...prevLoading, add: true }));

    await handleSubmitNews(newNews)
      .then(() => {
        setNewNews({ title: '', description: '' });
        setIsModalOpen(false);
        mutate('/api/news');
      })
      .finally(() =>
        setLoading((prevLoading) => ({ ...prevLoading, add: false }))
      );
  };

  return (
    <Box bg="#f7f7f8" minHeight="100vh" color="#4a4b56">
      <AdminHeader />

      <Box p={8} mx="auto" maxWidth="800px">
        <Heading as="h1" mb={8} textAlign="center">
          Admin Page
        </Heading>

        {/* Button to open the modal */}
        <Flex w="full" justifyContent={'flex-end'}>
          <Button colorScheme="blue" onClick={() => setIsModalOpen(true)}>
            Add News
          </Button>
        </Flex>

        {/* Modal for adding new news */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add News</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleFormSubmit}>
              <ModalBody>
                <AddNewsForm
                  setTitle={(t: string) =>
                    setNewNews((prevNews) => ({
                      ...prevNews,
                      title: t,
                    }))
                  }
                  setDesc={(d: string) =>
                    setNewNews((prevNews) => ({
                      ...prevNews,
                      description: d,
                    }))
                  }
                />
                {/* <VStack spacing={4}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      type="text"
                      value={newNews.title}
                      onChange={(e) =>
                        setNewNews((prevNews) => ({
                          ...prevNews,
                          title: e.target.value,
                        }))
                      }
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Content</FormLabel>
                    <Textarea
                      value={newNews.description}
                      onChange={(e) =>
                        setNewNews((prevNews) => ({
                          ...prevNews,
                          description: e.target.value,
                        }))
                      }
                      required
                    />
                  </FormControl>
                </VStack> */}
              </ModalBody>
              <ModalFooter gap={'1em'}>
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  isLoading={loading.add}
                  disabled={loading.add}
                  colorScheme="blue"
                  type="submit"
                >
                  Add
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>

        {!isLoading ? (
          <News news={news} isAdmin={true} />
        ) : (
          <Box borderWidth="1px" borderRadius="lg" p={4}>
            <Text w="full" textAlign={'center'} fontWeight="bold" mb={2}>
              Loading News ....
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminNewsPage;
