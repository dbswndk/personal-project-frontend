import { Box, Button, Container, TextField } from '@mui/material'
import { registerBoard } from 'map/api/BoardMapApi'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

const MapBoardRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { place_name } = useParams<{ place_name: string }>(); 
  const [writer] = useState(''); 
  const mutation = useMutation(
    (data: { title: string; content: string }) => {
      if (place_name) {
        return registerBoard(place_name, data);
      } else {
        throw new Error("place_name이 undefined입니다.");
      }
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData('board', data);
        if (place_name) {
          navigate(`/map?selectedPlace=${encodeURIComponent(place_name)}`);
          // navigate(`/map/boardMapList/${encodeURIComponent(place_name)}`);
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
