import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { ChangeEvent, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const toolbarOptions = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // Basic formatting options
    [{ font: [] }], // Font family dropdown
    [{ list: 'ordered' }, { list: 'bullet' }], // Ordered list and unordered list options
    ['clean'], // Remove formatting option
  ],
};

const AddNewsForm = ({
  setTitle,
  setDesc,
}: {
  setTitle: (t: string) => void;
  setDesc: (d: string) => void;
}) => {
  //   const [title, setTitle] = useState('');
  const [richText, setRichText] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleRichTextChange = (value: string) => {
    setDesc(value);
  };

  return (
    <Box
      //   maxW="500px"
      mx="auto"
      minH={'420px'}
      p={4}
      bg="white"
      boxShadow="md"
      borderRadius="md"
    >
      <form
        style={{
          minHeight: 'max-content',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '1em',
        }}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input onChange={handleTitleChange} />
        </FormControl>
        {isClient && (
          <FormControl mt={4}>
            <FormLabel>Rich Text</FormLabel>
            <ReactQuill
              //   value={richText}
              onChange={handleRichTextChange}
              theme="snow"
              modules={toolbarOptions}
              style={{
                height: '200px',
              }}
            />
          </FormControl>
        )}
      </form>
    </Box>
  );
};

export default AddNewsForm;
