import { Box, Button, Container, TextField } from '@mui/material'
import { AxiosError } from 'axios'
import { useBoardQuery, useBoardUpdateMutation } from 'map/api/BoardMapApi'
import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

interface MapBoardModifyPageProps {
  place_name: string;
  boardMapId: number | string; 
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoardMapModifyPage: React.FC<MapBoardModifyPageProps> = ({ place_name, boardMapId, setIsEditing }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: board } = useBoardQuery(place_name || '', boardMapId.toString())
  const mutation = useBoardUpdateMutation()

  const [title, setTitle] = useState(board?.title || '')
  const [content, setContent] = useState(board?.content || '')

  const handleEditFinishClick = async () => {
    const { writer } = board || {}

    if (title && content && writer) {
      const updatedData: any = {
        boardMapId, title, content, writer
      }
      try {
        await mutation.mutateAsync(updatedData)
        queryClient.invalidateQueries(['board', boardMapId])
        setIsEditing(false);
      } catch (error) {
        if ((error as AxiosError).response && ((error as AxiosError).response?.status === 400)) {
          alert('권한이 없습니다.');
          navigate('/board');
        } else {
          console.error('수정 중 오류가 발생했습니다:', error);
        }
      }
    }
  }
  const handleCancelClick = () => {
    if (place_name) {
      queryClient.invalidateQueries('boardList')
      setIsEditing(false);
    }
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
    <Box display="flex" flexDirection="column" gap={2} p={2}>
      <TextField label="제목" name="title"
                  value={ title } sx={{ borderRadius: '4px' }}
                  onChange={ (e) => setTitle(e.target.value) }/>
      {/* <TextField label="작성자" name="writer" disabled 
                  value={ board?.writer || '' } sx={{ borderRadius: '4px' }}/>
      <TextField label="작성일자" name="updatedData" disabled 
                  value={ board?.updatedData || '' } sx={{ borderRadius: '4px' }}/> */}
      <TextField label="내용" name="content" multiline
                  value={ content } minRows={10} maxRows={10} sx={{ borderRadius: '4px' }}
                  onChange={ (e) => setContent(e.target.value) }/>
      <Button variant='outlined' onClick={ handleEditFinishClick }>수정 완료</Button>
      <Button variant='outlined' onClick={ handleCancelClick }>취소</Button>
    </Box>
  </Container>
  )
}

export default BoardMapModifyPage