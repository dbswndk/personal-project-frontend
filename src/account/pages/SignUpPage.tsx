import React, { useState } from 'react'
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

  const [errorMessage, setErrorMessage] = useState('')
  const [passwordMatchError, setPasswordMatchError] = useState(false);

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

// const handleCheckEmailAvailability = async () => {
//   const email = document.getElementsByName('email')[0].value;
//   const isEmailAvailable = await checkEmailAvailability(email);
//   if (isEmailAvailable) {
//     setErrorMessage('사용 가능한 이메일입니다.');
//   } else {
//     setErrorMessage('이미 사용 중인 이메일입니다.');
//   }
// };

    if (password.value !== checkPassword.value) {
      setPasswordMatchError(true);
      return;
    }

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
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={3} p={20}>
          <TextField label='이메일' name='email' sx={{ borderRadius: '2px' }}/>
          <TextField label='비밀번호' name='password' sx={{ borderRadius: '2px' }}/>
          <TextField label='비밀번호 확인' name='checkPassword' sx={{ borderRadius: '2px' }}
                error={passwordMatchError} helperText={passwordMatchError && '비밀번호가 일치하지 않습니다.'}/>
          <TextField label='이름' name='name' sx={{ borderRadius: '2px' }}/>
          <TextField label='휴대폰 번호' name='phoneNumber' sx={{ borderRadius: '2px' }}/>
          <Button type='submit'>회원 가입</Button>
          {errorMessage && <p>{errorMessage}</p>}
          {/* <Button onClick={handleCheckEmailAvailability}>이메일 중복 확인</Button> */}
        </Box>        
      </form>
    </Container>
  )
}

export default SignUpPage
