import useFirebase, { TImage } from '@/hooks/useFirebase';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';

import Link from 'next/link';
import ImageUploader from '../image';
// Header component
export const AdminHeader = () => {
  return (
    <HStack
      justifyContent={'space-between'}
      p={4}
      w="full"
      bg="#1c1c1e"
      color="white"
    >
      <Heading as="h1" size="lg">
        Escape Agency Admin
      </Heading>
      <HStack>
        {[
          {
            title: 'Home',
            href: '/admin',
          },
          {
            title: 'News',
            href: '/admin/news',
          },
          {
            title: 'Player',
            href: '/admin/player',
          },
          {
            title: 'Management',
            href: '/admin/management',
          },
        ].map((link, idx) => (
          <Link key={link.title} href={link.href}>
            <Button
              color="white"
              colorScheme="teal"
              _hover={{
                color: 'teal.500',
                bg: 'white',
              }}
              variant="ghost"
            >
              {link.title}
            </Button>
          </Link>
        ))}
      </HStack>
    </HStack>
  );
};

// Footer component
const Footer = () => {
  return (
    <Box p={4} bg="#1c1c1e" w="full" color="white" textAlign="center">
      &copy; {new Date().getFullYear()} Escape Agency. All rights reserved.
    </Box>
  );
};

export default function Admin({ images }: { images: Record<TImage, string> }) {
  const [photo1, setPhoto1] = useState(images?.image1 || '');
  const [photo2, setPhoto2] = useState(images?.image2 || '');
  const [photo3, setPhoto3] = useState(images?.image3 || '');
  const [bg, setBg] = useState(images?.bg || '');

  const { handleUpdateImage } = useFirebase();

  const [imageUploading, setImageUploading] = useState(false);
  const toast = useToast();
  // Functions to handle form submissions
  const handlePhotoUpload = async (e: FormEvent) => {
    setImageUploading(true);
    e.preventDefault();
    await handleUpdateImage({
      image1: photo1,
      image2: photo2,
      image3: photo3,
      bg,
    })
      .then(() => {
        toast({
          title: 'Your image has been uploaded successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => setImageUploading(false));
  };

  return (
    <VStack
      bg="#f7f7f8"
      w="full"
      justifyContent={'space-between'}
      minHeight="100vh"
      minW={'100vw'}
      color="#4a4b56"
    >
      <AdminHeader />
      <Box p={8} mx="auto" w="full" maxWidth="800px">
        <Heading as="h1" mb={8} textAlign="center">
          Admin Page
        </Heading>

        {/* Option 1: Add three photos for home page */}
        <Box mb={8} w="full">
          <Heading as="h2" size="md" mb={4}>
            Add Three Photos for Home Page
          </Heading>
          <form
            onSubmit={handlePhotoUpload}
            style={{
              width: '100%',
            }}
          >
            <FormControl id="photo1" mb={4}>
              <FormLabel>Photo 1 URL</FormLabel>
              <ImageUploader imageUrl={photo1} setImageUrl={setPhoto1} />
              {/* <Input
                type="text"
                value={photo1}
                onChange={(e) => setPhoto1(e.target.value)}
              /> */}
            </FormControl>
            <FormControl id="photo2" mb={4}>
              <FormLabel>Photo 2 URL</FormLabel>
              <ImageUploader imageUrl={photo2} setImageUrl={setPhoto2} />

              {/* <Input
                type="text"
                value={photo2}
                onChange={(e) => setPhoto2(e.target.value)}
              /> */}
            </FormControl>
            <FormControl id="photo3" mb={4}>
              <FormLabel>Photo 3 URL</FormLabel>
              <ImageUploader imageUrl={photo3} setImageUrl={setPhoto3} />

              {/* <Input
                type="text"
                value={photo3}
                onChange={(e) => setPhoto3(e.target.value)}
              /> */}
            </FormControl>
            <FormControl id="photo3" mb={4}>
              <FormLabel>Background URL</FormLabel>
              <ImageUploader imageUrl={bg} setImageUrl={setBg} />

              {/* <Input
                type="text"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
              /> */}
            </FormControl>
            <Button
              isLoading={imageUploading}
              disabled={imageUploading}
              mt={4}
              colorScheme="blue"
              type="submit"
            >
              Upload Photos
            </Button>
          </form>
        </Box>
      </Box>
      <Footer />
    </VStack>
  );
}
