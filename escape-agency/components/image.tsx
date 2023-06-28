import uploadImage from '@/utils/image-upload';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent } from 'react';

const ImageUploader = ({
  imageUrl,
  setImageUrl,
}: {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}) => {
  const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const toast = useToast();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    toast({
      title: 'Uploading .... ',
    });
    if (e.target.files) {
      Object.values(e.target.files).forEach(async (file) => {
        uploadImage(file)
          .then((url) => {
            setImageUrl(url as string);
          })
          .catch((err) => {
            console.log('err = ', err);
            toast({
              title: err,
              status: 'error',
              isClosable: true,
            });
          });
      });
    }
  };

  const handleImageRemove = () => {
    setImageUrl('');
  };

  return (
    <Box p={4} bg="white" boxShadow="md" borderRadius="md">
      <VStack spacing={4} align="flex-start">
        <FormControl>
          <FormLabel>Image URL</FormLabel>
          <Input
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
          {/* {imageUrl && (
            <Image src={imageUrl} alt="Selected Image" maxH="200px" />
          )} */}
        </FormControl>

        <FormControl>
          <FormLabel>Upload Image</FormLabel>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {imageUrl && (
            <>
              <Image src={imageUrl} alt="Selected Image" maxH="200px" />
              <Button mt={2} colorScheme="red" onClick={handleImageRemove}>
                Remove Image
              </Button>
            </>
          )}
        </FormControl>
      </VStack>
    </Box>
  );
};

export default ImageUploader;
