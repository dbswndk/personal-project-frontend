import { Box, Button, Container, TextField } from '@mui/material'
import { registerBoard } from 'map/api/BoardMapApi'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

interface MapBoardRegisterPageProps {
  place_name: string;
  setIsWriting: React.Dispatch<React.SetStateAction<boolean>>; 
}

const MapBoardRegisterPage: React.FC<MapBoardRegisterPageProps> = ({ place_name, setIsWriting }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [writer] = useState(''); 
  const mutation = useMutation(
    (data: { title: string; content: string }) => {
      if (place_name) {
        return registerBoard(place_name, data);
      } else {
        throw new Error("해당하는 장소가 존재하지않습니다.");
      }
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('boardList'); 
        if (place_name) {
          setIsWriting(false);
        }
      }
    }
  );
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      elements: {
        title: { value: string };
        content: { value: string };
      };
    };

    const { title, content } = target.elements;

    const data = {
      place_name: place_name,
      title: title.value,
      writer: writer,
      content: content.value,
    };
    await mutation.mutateAsync(data);

    setIsWriting(false);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '2em' }}>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2} p={2}>
          <TextField label="제목" name="title" sx={{ borderRadius: '4px' }}/>
          <TextField label="내용" name="content" multiline minRows={10} maxRows={10} sx={{ borderRadius: '4px' }}/>
        </Box>
        <Button type="submit">작성 완료</Button>
      </form>
    </Container>
  )
}

export default MapBoardRegisterPage;
