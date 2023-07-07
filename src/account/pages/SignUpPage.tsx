import React from 'react'
import { Box, Button, Container, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { signupAccount } from '../api/AccountApi'

const SignUpPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutation = useMutation(signupAccount, {
    onSuccess: (data) => {
      queryClient.setQueriesData('account', data)
      navigate('/login')
    }
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      elements: {
        email: { value: string }
        password: { value: string }
        checkPassword: { value: string }
        name: { value: string }
        phoneNumber: { value: string }
      }
    }

    const { email, password, checkPassword, name, phoneNumber } = target.elements

    const data = {
      email: email.value,
      password: password.value,
      checkPassword: checkPassword.value,
      name: name.value,
      phoneNumber: phoneNumber.value,
    }

    await mutation.mutateAsync(data)
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: '2em' }}>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2} p={2}>
          <TextField label='이메일' name='email' sx={{ borderRadius: '4px' }}/>
          <TextField label='비밀번호' name='password' sx={{ borderRadius: '4px' }}/>
          <TextField label='비밀번호 확인' name='checkPassword' sx={{ borderRadius: '4px' }}/>
          <TextField label='이름' name='name' sx={{ borderRadius: '4px' }}/>
          <TextField label='휴대폰 번호' name='phoneNumber' sx={{ borderRadius: '4px' }}/>
        </Box>
        <Button type='submit'>회원 가입</Button>
      </form>
    </Container>
  )
}

export default SignUpPage