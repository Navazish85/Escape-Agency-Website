import { AdminHeader } from '@/components/admin/admin';
import ImageUploader from '@/components/image';
import OurTalents from '@/components/talent';
import useFirebase, { TPlayer } from '@/hooks/useFirebase';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import swr from 'swr';
const Player = () => {
  const { getPlayers, handleSubmitPlayer } = useFirebase();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerData, setPlayerData] = useState({
    age: '',
    bio: '',
    country: '',
    image1: '',
    image2: '',
    lane: '',
    name: '',
    video_url: '',
    id: '',
  });

  const [players, setPlayers] = useState<Record<TPlayer, string>[]>([]);

  swr('/api/player', async () => await getPlayers(), {
    onSuccess: (data) => {
      setPlayers(data);
    },
  });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlayerData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddPlayer = async () => {
    // Perform any necessary validation or API calls to add the player
    const id = players.length + 1;
    await handleSubmitPlayer({ ...playerData, id: String(id) }).then(() => {
      handleModalClose();
      setPlayers((prevPlayers) => [...prevPlayers, playerData]);
    });
  };

  return (
    <Box bg="#f7f7f8" minHeight="100vh" color="#4a4b56">
      <AdminHeader />

      <Box p={8} mx="auto" maxWidth="800px">
        <Heading as="h1" mb={8} textAlign="center">
          Admin Page
        </Heading>

        <HStack w="full" justifyContent={'flex-end'} mx="auto">
          <Button colorScheme="blue" onClick={handleModalOpen}>
            Add Player
          </Button>
        </HStack>

        {/* Player Detail Section */}
        {/* Replace this section with your actual player detail display */}
        <OurTalents players={players} isAdmin={true} />
        {/* Add Player Modal */}
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Player</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Age</FormLabel>
                <Input
                  name="age"
                  value={playerData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  name="bio"
                  value={playerData.bio}
                  onChange={(e) =>
                    setPlayerData((prevData) => ({
                      ...prevData,
                      bio: e.target.value,
                    }))
                  }
                  placeholder="Enter bio"
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Country</FormLabel>
                <Input
                  name="country"
                  value={playerData.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Image 1</FormLabel>
                <ImageUploader
                  imageUrl={playerData.image1}
                  setImageUrl={(u) =>
                    setPlayerData((pre) => ({ ...pre, image1: u }))
                  }
                />

                {/* <Input
                  name="image1"
                  value={playerData.image1}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                /> */}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Image 2</FormLabel>
                <ImageUploader
                  imageUrl={playerData.image2}
                  setImageUrl={(u) =>
                    setPlayerData((pre) => ({ ...pre, image2: u }))
                  }
                />

                {/* <Input
                  name="image2"
                  value={playerData.image2}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                /> */}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Lane</FormLabel>
                <Input
                  name="lane"
                  value={playerData.lane}
                  onChange={handleChange}
                  placeholder="Enter lane"
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={playerData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Video URL</FormLabel>
                <Input
                  name="video_url"
                  value={playerData.video_url}
                  onChange={handleChange}
                  placeholder="Enter video URL"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleAddPlayer}>
                Add
              </Button>
              <Button variant="ghost" onClick={handleModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default Player;
