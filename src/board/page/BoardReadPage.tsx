import { Box, Button, Container, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteBoard, fetchBoard, useBoardQuery } from '../api/BoardApi'
import { isAxiosError } from 'utility/axiosInstance'

interface RouteParams {
  boardId: string
  [key: string]: string
}

const BoardReadPage = () => {
  const navigate = useNavigate()
  const { boardId } = useParams<RouteParams>()
  const queryClient = useQueryClient()

  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  const { data: board } = useBoardQuery(boardId || '')
  console.log('boardId확인', boardId)

  useEffect(() => {
    const fetchBoardData = async () => {
      const data = await fetchBoard(boardId || '')
      console.log(data)

      const serverAccountId = data?.accountId;
      const localStorageAccountId = localStorage.getItem('accountId');

      if (localStorageAccountId !== null) {
        const localStorageAccountIdNumber = Number(localStorageAccountId);

        if (serverAccountId === localStorageAccountIdNumber) {
          setIsAuthorized(true);
        }
      }
    };
    fetchBoardData();
  }, [boardId]);

  const handleEditClick = () => {
    navigate(`/modify/${boardId}`)
  }

  const handleDeleteClick = async () => {
    try {
      await deleteBoard(boardId || '');
      queryClient.invalidateQueries('boardList');
      navigate('/board');
    } catch (error) {
      if (isAxiosError(error) && (error.response?.status === 500 || error.response?.status === 400)) {
        alert('삭제 권한이 없습니다.');
        navigate('/board')
      } else {
        console.error('삭제 중 오류가 발생했습니다:', error);
      }
    }
  };

  const handleCancelClick = () => {
    queryClient.invalidateQueries('boardList')
    navigate('/board')
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: '2em' }}>
      <Box display="flex" flexDirection="column" gap={2} p={2}>
        <TextField label="제목" name="title" disabled 
                  value={board?.title || ''} sx={{ borderRadius: '4px' }}/>
        <TextField label="작성자" name="writer" disabled
                  value={board?.writer || ''} sx={{ borderRadius: '4px' }}/>
        <TextField label="내용" name="content" multiline 
                  disabled value={board?.content || ''} 
                  minRows={10} maxRows={10} sx={{ borderRadius: '4px' }}/>
        <TextField label="작성일자" name="createdData" disabled
                  value={board?.createdData || ''} sx={{ borderRadius: '4px' }}/>
        {isAuthorized && (
          <>
            <Button variant="outlined" onClick={handleEditClick}>수정</Button>
            <Button variant="outlined" onClick={handleDeleteClick}>삭제</Button>
          </>
        )}
        <Button variant='outlined' onClick={handleCancelClick}>돌아가기</Button>
      </Box>
    </Container>
  )
}

export default BoardReadPage
