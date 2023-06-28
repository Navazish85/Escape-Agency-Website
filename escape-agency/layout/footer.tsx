import { Box, Flex, HStack, Link, Text } from '@chakra-ui/react';
import { AiOutlineTwitter } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
const Footer = () => {
  return (
    <Box
      pos={'absolute'}
      minW="90%"
      bottom={10}
      borderTop="1px solid"
      borderTopColor="gray.300"
      mt={8}
      pt={8}
    >
      <Flex
        direction={{ base: 'column-reverse', md: 'row' }}
        justify="space-between"
        align="center"
        maxW="container.lg"
        m="auto"
        alignItems="center"
      >
        <Text fontSize="sm" color="white" mb={{ base: 4, md: 0 }}>
          &copy; {new Date().getFullYear()} Escape Agency. All rights reserved.
        </Text>
        <Flex alignItems={'center'}>
          <Link
            href="#"
            mx={2}
            // color="brand.blue"
            color="white"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            mx={2}
            // color="brand.blue"
            color="white"
          >
            Terms of Service
          </Link>
          <HStack>
            <MdEmail
              size={26}
              onClick={() => window.open('mailto:contact@escape-agency.org')}
              cursor={'pointer'}
            />
            <AiOutlineTwitter
              size={26}
              onClick={() =>
                window.open('https://twitter.com/EscapeAgency21', '_blank')
              }
              cursor={'pointer'}
            />
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
