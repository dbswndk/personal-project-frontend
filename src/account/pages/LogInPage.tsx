import { Box, Container, Grid, TextField, Button } from '@mui/material'
import { loginAccount } from 'account/api/AccountApi';
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

const LogInPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutation = useMutation(loginAccount, {
    onSuccess: (data) => {
      console.log('로그인 성공:', data)
      queryClient.setQueriesData('account', data)

      localStorage.setItem('userToken', data.userToken)
      navigate('/')
    }
  })

  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const { email, password } = formData

    const data = {
      email,
      password,
    }

    await mutation.mutateAsync(data)
  }
  
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ position: 'relative' }}>
                <TextField label='이메일' name='email' fullWidth variant="filled" margin="normal"
                              sx={{ borderRadius: '2px' }} value={formData.email} onChange={handleChange} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ position: 'relative' }}>
                <TextField label='비밀번호' name='password' fullWidth variant="filled" margin="normal"
                              sx={{ borderRadius: '2px' }} value={formData.password} onChange={handleChange} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                로그인
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default LogInPage;
