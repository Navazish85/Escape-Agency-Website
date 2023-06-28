import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

const HeaderData = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'News',
    link: '/news',
  },
  {
    title: 'Players',
    link: '/talent',
  },
  {
    title: 'Management',
    link: '/our-team',
  },
  {
    title: 'Contact',
    link: '/contact-us',
  },
];

const Header = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'column' }}
      align={{ base: 'center', md: 'flex-start' }}
      justify={{ base: 'center', md: 'space-between' }}
      justifyContent={'center'}
      alignItems={'center'}
      w="100%"
      mb={8}
    >
      <Flex
        mt={{ base: 4, md: 0 }}
        wrap={'wrap'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        {HeaderData.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            style={{
              textDecoration: 'none',
              // color: '#030303',
              color: '#fff',
              marginRight: '1em',
              minWidth: 'max-content',
              fontSize: '1.2em',
              fontWeight: '600',
            }}
          >
            {item.title.toUpperCase()}
          </Link>
        ))}
      </Flex>
      <VStack
        alignItems={'center'}
        mt="2em"
        mb={{ base: 4, md: 0 }}
        textAlign={{ base: 'center', md: 'center' }}
      >
        <Heading
          color="white"
          // color="brand.blue"
          as="h1"
          fontSize={'3em'}
          mb={4}
        >
          ESCAPE AGENCY
        </Heading>
        {/* <Image src="/logob.svg" w="10em" alt="logo" /> */}
        <Text
          px={{ base: '0em', md: '5em' }}
          textAlign={'center'}
          color="white"
        >
          Our highest priority is to make the absolute best for our players in
          order for them to achieve their goals and dreams. We take on
          negotiations with teams to secure that our clients have exactly what
          they want. We include to our team experienced lawyers, who secure the
          contracts in terms of the legal assessments.
        </Text>
      </VStack>
    </Flex>
  );
};

export default Header;
