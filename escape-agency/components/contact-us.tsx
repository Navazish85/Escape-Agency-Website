import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineTwitter } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  topic: string;
  message: string;
};

function ContactUs() {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: ContactFormData) => {
    // Submit form logic here
    setLoading(true);
    fetch('/api/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        toast({
          title: 'Form Submitted',
          description: 'Your message has been sent successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        reset();
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => setLoading(false));
  };

  return (
    // <Box bg="brand.white" p={8} w={'full'}>
    //   <Flex
    //     direction="column"
    //     align="center"
    //     maxW="container.lg"
    //     m="auto"
    //     py={8}
    //   >
    //     <Header />
    <VStack
      spacing={8}
      w="full"
      alignItems={'center'}
      justifyContent={'center'}
      align="stretch"
      // bg="white"
      py="2em"
      borderRadius={'md'}
      color="black"
    >
      <Heading color={'white'} as="h2" size="lg" mb={6}>
        Contact Us
      </Heading>
      <Box
        w={['100%', '70%', '50%']}
        borderRadius="lg"
        bg="white"
        boxShadow="md"
        p={6}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="firstName" mb={4} isInvalid={!!errors.firstName}>
            <FormLabel>First Name</FormLabel>
            <Input
              {...register('firstName', {
                required: 'First name is required',
              })}
            />
            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl id="lastName" mb={4} isInvalid={!!errors.lastName}>
            <FormLabel>Last Name</FormLabel>
            <Input
              {...register('lastName', { required: 'Last name is required' })}
            />
            <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl id="email" mb={4} isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl id="topic" mb={4} isInvalid={!!errors.topic}>
            <FormLabel>Topic</FormLabel>
            <Input {...register('topic', { required: 'Topic is required' })} />
            <FormErrorMessage>{errors.topic?.message}</FormErrorMessage>
          </FormControl>

          <FormControl id="message" mb={4} isInvalid={!!errors.message}>
            <FormLabel>Message</FormLabel>
            <Textarea
              {...register('message', { required: 'Message is required' })}
            />
            <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
          </FormControl>
          <Flex w={'full'} justifyContent={'flex-end'}>
            <Button
              type="submit"
              colorScheme="green"
              mt={4}
              isLoading={loading}
              disabled={loading}
            >
              Submit
            </Button>
          </Flex>
        </form>
        <Divider mt="2em" />
        <HStack mt="1em" w="full" justifyContent={'center'}>
          <MdEmail
            size={26}
            onClick={() => window.open('mailto:contact@escape-agency.org')}
            cursor={'pointer'}
            color="#1DA1F2"
          />
          <AiOutlineTwitter
            size={26}
            color="#1DA1F2"
            onClick={() =>
              window.open('https://twitter.com/EscapeAgency21', '_blank')
            }
            cursor={'pointer'}
          />
        </HStack>
      </Box>
    </VStack>
  );
}

export default ContactUs;
