import { Box, Container, Grid, TextField, Button, Snackbar, Typography, createTheme } from '@mui/material'
import { loginAccount } from 'account/api/AccountApi';
import { useAuth } from 'pages/AuthConText';
import React, { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import './css/LoginPage.css';

// const theme = createTheme({
//   components: {
//     MuiFilledInput: {
//       styleOverrides: {
//         root: {
//           width: '70%',
//         },
//       },
//     },
//   },
// });

const LogInPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { setIsLoggedIn } = useAuth(); 
  const [showLoginFailureSnackbar, setShowLoginFailureSnackbar] = useState(false);
  const mutation = useMutation(loginAccount, {
    onSuccess: (data) => {
      if (data.accessToken) {
        queryClient.setQueriesData('account', data);
        const accessToken = data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        setIsLoggedIn(true); // 로그인 상태 변경

        navigate('/');
      } else {
        setShowLoginFailureSnackbar(true);
        setFormData({ email: '', password: '' }); 
      }
    },
    onError: () => {
      setShowLoginFailureSnackbar(true);
      setFormData({ email: '', password: '' }); 
    },
  });

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

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" >
      <Container maxWidth="xs">
        <Typography variant="h4" gutterBottom>LOGIN</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ position: 'relative' }}>
              <TextField label='이메일' name='email' fullWidth variant="filled" margin="normal"
                            className="custom-input" InputLabelProps={{ shrink: true }} InputProps={{
                            disableUnderline: true }} value={formData.email} onChange={handleChange} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ position: 'relative' }}>
                <TextField label='비밀번호' name='password' fullWidth variant="filled" margin="normal"
                            className="custom-input" InputLabelProps={{ shrink: true }} InputProps={{ type: 'password',
                            disableUnderline: true }} value={formData.password} onChange={handleChange} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" style={{ backgroundColor: 'black', color: 'white' }} fullWidth>
                LOGIN
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      <Snackbar open={showLoginFailureSnackbar} autoHideDuration={5000} onClose={() => setShowLoginFailureSnackbar(false)}
        message="이메일과 비밀번호를 확인해주세요."
      />
    </Box>
  );
};

export default LogInPage;
