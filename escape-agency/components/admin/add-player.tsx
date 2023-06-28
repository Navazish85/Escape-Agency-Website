import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { AdminHeader } from './admin';

const AddPlayer = () => {
  const [lane, setLane] = useState('');
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [video, setVideo] = useState('');

  const handlePlayerSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle player submission logic
  };

  return (
    <Box bg="#f7f7f8" minHeight="100vh" color="#4a4b56">
      <AdminHeader />

      <Box p={8} mx="auto" maxWidth="800px">
        <Heading as="h1" mb={8} textAlign="center">
          Admin Page
        </Heading>

        <Box p={8} mx="auto" maxWidth="800px">
          <form onSubmit={handlePlayerSubmit}>
            <FormControl id="lane" mb={4}>
              <FormLabel>Lane</FormLabel>
              <Input
                type="text"
                value={lane}
                onChange={(e) => setLane(e.target.value)}
              />
            </FormControl>

            <FormControl id="photo" mb={4}>
              <FormLabel>Photo URL</FormLabel>
              <Input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </FormControl>

            <FormControl id="name" mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl id="country" mb={4}>
              <FormLabel>Country</FormLabel>
              <Input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </FormControl>

            <FormControl id="age" mb={4}>
              <FormLabel>Age</FormLabel>
              <Input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </FormControl>

            <FormControl id="bio" mb={4}>
              <FormLabel>Bio</FormLabel>
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
            </FormControl>

            <FormControl id="video" mb={4}>
              <FormLabel>Video URL</FormLabel>
              <Input
                type="text"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
              />
            </FormControl>

            <Button mt={4} colorScheme="blue" type="submit">
              Add Player
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default AddPlayer;
