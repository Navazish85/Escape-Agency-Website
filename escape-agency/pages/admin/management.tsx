/* eslint-disable react-hooks/rules-of-hooks */
import { AdminHeader } from '@/components/admin/admin';
import ImageUploader from '@/components/image';
import OurTeam from '@/components/out-team';
import useFirebase, { TTeam } from '@/hooks/useFirebase';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import swr, { useSWRConfig } from 'swr';
const ManagementPage = () => {
  const { getTeams } = useFirebase();
  const { mutate } = useSWRConfig();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teams, setTeams] = useState<TTeam[]>([]);
  const [newTeam, setNewTeam] = useState<{
    img_url: string;
    name: string;
    role: string;
  }>({
    img_url: '',
    name: '',
    role: '',
  });

  const { isLoading } = swr('/api/team', async () => await getTeams(), {
    onSuccess: (data) => {
      setTeams(data);
    },
  });

  const [loading, setLoading] = useState({
    add: false,
    update: false,
    delete: false,
  });

  const { handleSubmitTeam } = useFirebase();

  // Function to handle form submission
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTeams((prevTeam) => [
      ...prevTeam,
      {
        ...newTeam,
        id: String(teams.length + 1),
      },
    ]);

    setLoading((prevLoading) => ({ ...prevLoading, add: true }));

    await handleSubmitTeam({
      ...newTeam,
      id: String(teams.length + 1),
    })
      .then(() => {
        setNewTeam({ img_url: '', name: '', role: '' });
        setIsModalOpen(false);
        mutate('/api/team');
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
            Add Management Member
          </Button>
        </Flex>

        {/* Modal for adding new news */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleFormSubmit}>
              <ModalBody>
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      value={newTeam.name}
                      onChange={(e) =>
                        setNewTeam((prevTeam) => ({
                          ...prevTeam,
                          name: e.target.value,
                        }))
                      }
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Textarea
                      value={newTeam.role}
                      onChange={(e) =>
                        setNewTeam((prevTeam) => ({
                          ...prevTeam,
                          role: e.target.value,
                        }))
                      }
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Image Url</FormLabel>
                    <ImageUploader
                  imageUrl={newTeam.img_url}
                  setImageUrl={(u) =>
                    setNewTeam((prevTeam) => ({
                      ...prevTeam,
                      img_url: u,
                    }))
                  }
                />

                    {/* <Textarea
                      value={newTeam.img_url}
                      onChange={(e) =>
                        setNewTeam((prevTeam) => ({
                          ...prevTeam,
                          img_url: e.target.value,
                        }))
                      }
                      required
                    /> */}
                  </FormControl>
                </VStack>
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
          <OurTeam teams={teams} isAdmin={true} />
        ) : (
          <Box borderWidth="1px" borderRadius="lg" p={4}>
            <Text w="full" textAlign={'center'} fontWeight="bold" mb={2}>
              Loading Management ....
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ManagementPage;
