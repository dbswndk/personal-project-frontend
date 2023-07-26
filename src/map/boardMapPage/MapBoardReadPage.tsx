import { Box, Button, Container, TextField } from '@mui/material'
import { deleteBoard, fetchBoard, useBoardQuery } from 'map/api/BoardMapApi'
import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { isAxiosError } from 'utility/axiosInstance'
import MapBoardModifyPage from './MapBoardModifyPage'

interface MapBoardReadPageProps {
  place_name: string;
  boardMapId: number | string; 
  setIsReading: React.Dispatch<React.SetStateAction<number | null>>;
}

const MapBoardReadPage: React.FC<MapBoardReadPageProps> = ({ place_name, boardMapId, setIsReading }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data: board } = useBoardQuery(place_name || '', boardMapId.toString())

  useEffect(() => {
    const fetchBoardData = async () => {
      const data = await fetchBoard(place_name || '', boardMapId.toString());
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
  }, [place_name, boardMapId]);

  const handleEditClick = () => {
    if (place_name) {
      setIsEditing(true); 
    }
  }

  const handleDeleteClick = async () => {
    try {
      await deleteBoard(place_name || '', boardMapId.toString());
      queryClient.invalidateQueries('boardList');
      setIsReading(null); 
    } catch (error) {
      if (isAxiosError(error) && (error.response?.status === 500 || error.response?.status === 400)) {
        alert('삭제 권한이 없습니다.');
        setIsReading(null); 
      } else {
        console.error('삭제 중 오류가 발생했습니다:', error);
      }
    }
  };

  const handleCancelClick = () => {
    queryClient.invalidateQueries('boardList');
    setIsReading(null); 
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '2em' }}>
    {isEditing ? (
          <MapBoardModifyPage place_name={place_name} boardMapId={boardMapId} setIsEditing={setIsEditing} />
        ) : (
    <Box display="flex" flexDirection="column" gap={2} p={2}>
      <TextField label="제목" name="title" disabled 
                value={board?.title || ''} sx={{ borderRadius: '4px' }}/>
      <TextField label="병원" name="place_name" disabled 
                value={place_name || ''} sx={{ borderRadius: '4px' }}/>
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
    )}
  </Container>
  )
}

export default MapBoardReadPage