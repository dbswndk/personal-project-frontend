import { Box, Button, Container, TextField } from '@mui/material'
import { fetchAccount, useAccountQuery } from 'account/api/AccountApi'
import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

const MyInfoPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accessToken = localStorage.getItem('accessToken');

  const { data: account } = useQuery('account', fetchAccount, {
    enabled: !!accessToken, 
  });

  const handleEditClick = () => {
    navigate(`/account/myPage`);
  }

  //   const handleDeleteClick = async () => {
  //     await deleteAccount(accountId || '')
  //     queryClient.invalidateQueries('account')
  //     navigate('/')
  //   }

  const handleCancelClick = () => {
    queryClient.invalidateQueries('account');
    navigate('/');
  }

  return (
    <Container maxWidth="xs" sx={{ marginTop: '2em' }}>
      <Box display="flex" flexDirection="column" gap={2} p={2}>
        <TextField label="이메일" name="email" disabled 
                  value={ account?.email || '' } sx={{ borderRadius: '4px' }}/>
        <TextField label="이름" name="name" disabled
                  value={ account?.name || '' } sx={{ borderRadius: '4px' }}/>
        <TextField label="전화번호" name="name" disabled
                  value={ account?.phoneNumber || '' } sx={{ borderRadius: '4px' }}/>
        {/* <TextField label="거주지" name="name" disabled
                  value={ account?.writer || '' } sx={{ borderRadius: '4px' }}/> */}
        {/* <TextField label="기록" name="content" multiline 
                  disabled value={ account?.content || '' } 
                  minRows={10} maxRows={10} sx={{ borderRadius: '4px' }}/> */}
        <Button variant='outlined' onClick={ handleEditClick }>수정</Button>
        {/* <Button variant='outlined' onClick={ handleDeleteClick }>탈퇴</Button> */}
        <Button variant='outlined' onClick={ handleCancelClick }>돌아가기</Button>
      </Box>
    </Container>
  )
}

export default MyInfoPage;
