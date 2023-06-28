import { TImage, TNews } from '@/hooks/useFirebase';
import { VStack } from '@chakra-ui/react';
import ImageSlider from './image-slider';
import News from './news';

function Home({
  images,
  newsList,
}: {
  images: Record<TImage, string>;
  newsList: Record<TNews, string>[];
}) {
  return (
    <VStack w="full" justifyContent={'flex-start'}>
      <ImageSlider images={images} />
      {/* <Flex direction={{ base: 'column', md: 'row' }} gap={'1em'} mb={8}>
        <Box w={{ base: '100%', md: '48%' }} mb={{ base: 4, md: 0 }}>
          <Image src={images.image1} alt="Players" boxSize="100%" />
        </Box>
        <Box w={{ base: '100%', md: '48%' }}>
          <Image src={images.image2} alt="Stadium" boxSize="100%" />
        </Box>
      </Flex> */}
      <News news={newsList} />
    </VStack>
  );
}

export default Home;
