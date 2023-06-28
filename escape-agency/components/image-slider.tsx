// import { Box } from '@chakra-ui/react';
// import { Slide } from 'react-slideshow-image';

// const responsiveSettings = [
//   {
//     breakpoint: 800,
//     settings: {
//       slidesToShow: 3,
//       slidesToScroll: 3,
//     },
//   },
//   {
//     breakpoint: 500,
//     settings: {
//       slidesToShow: 2,
//       slidesToScroll: 2,
//     },
//   },
// ];
// const ImageSlider = () => {
//   return (
//     <div>
//       <Slide
//         slidesToScroll={2}
//         slidesToShow={2}
//         indicators={true}
//         responsive={responsiveSettings}
//       >
//         <Box bg="white" height={'40em'} w="40em"></Box>
//         <Box bg="white" height={'40em'} w="40em"></Box>
//         <Box bg="white" height={'40em'} w="40em"></Box>
//         {/* children here */}
//       </Slide>
//     </div>
//   );
// };

// export default ImageSlider;

import { TImage } from '@/hooks/useFirebase';
import { Box } from '@chakra-ui/react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const responsiveSettings = [
  {
    breakpoint: 800,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 200,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];
const ImageSlider = ({ images }: { images: Record<TImage, string> }) => {
  const slideImages = ['/1.jpeg', '/2.jpeg', '/1.jpeg'];
  console.log(images);
  return (
    <Box w="100%" h="400px" rounded="md" overflow="hidden" position="relative">
      <Slide
        indicators={true}
        arrows={true}
        autoplay
        transitionDuration={500}
        duration={3000}
        slidesToScroll={1}
        slidesToShow={2}
        responsive={responsiveSettings}
      >
        {images &&
          Object.keys(images).map((key, index) => {
            if (key === 'bg') return;
            return (
              <Box
                mr={key === 'image3' ? '0em' : '1em'}
                className="each-slide"
                key={index}
              >
                <Box
                  bgImage={`url(${images[key as TImage]})`}
                  bgSize="cover"
                  bgPosition="center"
                  h="400px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                ></Box>
              </Box>
            );
          })}
      </Slide>
    </Box>
  );
};

export default ImageSlider;
