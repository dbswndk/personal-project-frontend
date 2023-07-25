import React, { useState } from 'react'
import { Box, Button, Container, Grid, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { checkEmailDuplicate, signupAccount } from '../api/AccountApi'
import './css/TotalSignUpPage.css'; 

const SignUpPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const activeColor = 'rgba(0, 0, 0, 0.5)';
  const inactiveColor = '#cccccc';
  const mutation = useMutation(signupAccount, {
    onSuccess: (data) => {
      queryClient.setQueriesData('account', data)
      navigate('/login')
    }
  })

  // 유효성 검사
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordCheck, setPasswordCheck] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean>(false)
  const [isEmailDuplicateChecked, setIsEmailDuplicateChecked] = useState<boolean>(true);

  // 오류 메세지
  const [emailMessage, setEmailMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordCheckMessage, setPasswordCheckMessage] = useState('')
  

  // 이메일 유효성 검사
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail = e.target.value
    setEmail(currentEmail)
    const emailEx = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
  
    if (!emailEx.test(currentEmail)) {
      setEmailMessage('올바른 이메일 형식을 사용해주세요.')
    } else {
      setEmailMessage('')
    }
    checkFormValidity();
  }
  

  // 비밀번호 유효성 검사
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassword = e.target.value
    setPassword(currentPassword)
    const passwordEx = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;   // /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/; 특수문자포함

    if (!passwordEx.test(currentPassword)) {
      setPasswordMessage('영문, 숫자 조합으로 8자리 이상 입력해주세요')
    } else {
      setPasswordMessage('')
    }
    checkFormValidity();
  }

  // 비밀번호 확인 유효성 검사
  const onChangePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPasswordCheck = e.target.value
    setPasswordCheck(currentPasswordCheck)

    if (password !== currentPasswordCheck) {
      setPasswordCheckMessage('비밀번호가 일치하지 않습니다.')
    } else {
      setPasswordCheckMessage('')
    }
    checkFormValidity();
  }

  // 휴대폰 번호 '-' 자동 생성
  const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let formattedPhoneNumber = value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
    formattedPhoneNumber = formattedPhoneNumber.slice(0, 11); // 11자리까지만 유지
    if (formattedPhoneNumber.length === 11) {
      formattedPhoneNumber = `${formattedPhoneNumber.slice(0, 3)}-${formattedPhoneNumber.slice(3, 7)}-${formattedPhoneNumber.slice(7)}`;
    }
    setPhoneNumber(formattedPhoneNumber);
    checkFormValidity();
  };

  // 이메일 중복 검사
  const handleDuplicateCheck = async () => {
    try {
      const isDuplicate = await checkEmailDuplicate(email);
      if (isDuplicate) {
        setEmailMessage('사용 가능한 이메일입니다.');
        setIsEmailAvailable(true);
      } else {
        setEmailMessage('중복된 이메일입니다.');
        setIsEmailAvailable(false);
      }
    } catch (error) {
      console.error('중복 확인 오류:', error);
      setEmailMessage('오류 발생');
    }
    setIsEmailDuplicateChecked(true);
    checkFormValidity();
  };
  

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

  // 회원 가입 버튼 활성화 조건
  const checkFormValidity = () => {
    setIsFormValid(
      email !== '' &&
      password !== '' &&
      passwordCheck !== '' &&
      phoneNumber !== '' &&
      isEmailAvailable &&
      (isEmailAvailable || !isEmailDuplicateChecked)
    );
  };  
  
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <TextField label='이메일' name='email' fullWidth variant="filled" margin="normal" className="custom-input"
                              sx={{ borderRadius: '2px', minWidth: '200px' }} onChange={onChangeEmail} />
                {emailMessage && <p style={{ fontSize: '12px', color: 'red', 
                              marginTop: '5px', position: 'absolute', bottom: '-20px' }}>{emailMessage}</p>}
              </div>
              <Button variant="contained" onClick={handleDuplicateCheck} style={{ marginLeft: '10px', minWidth: '120px', 
                              backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}>중복 확인</Button>
            </div>
          </Grid>
            <Grid item xs={12}>
              <div style={{ position: 'relative' }}>
                <TextField label='비밀번호' name='password' fullWidth variant="filled" margin="normal" className="custom-input"
                              type="password" sx={{ borderRadius: '2px' }} onChange={onChangePassword} />
                {passwordMessage && <p style={{ fontSize: '12px', color: 'red', 
                              marginTop: '5px', position: 'absolute', bottom: '-20px' }}>{passwordMessage}</p>}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ position: 'relative' }}>
                <TextField label='비밀번호 확인' name='checkPassword' fullWidth variant="filled" margin="normal" className="custom-input"
                              type="password" sx={{ borderRadius: '2px' }} onChange={onChangePasswordCheck} />
                {passwordCheckMessage && <p style={{ fontSize: '12px', color: 'red', 
                              marginTop: '5px', position: 'absolute', bottom: '-20px' }}>{passwordCheckMessage}</p>}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ position: 'relative' }}>
                <TextField label='이름' name='name' fullWidth variant="filled" margin="normal" className="custom-input"
                              sx={{ borderRadius: '2px' }} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ position: 'relative' }}>
                <TextField label='휴대폰 번호' name='phoneNumber' fullWidth variant="filled" margin="normal" className="custom-input"
                              sx={{ borderRadius: '2px' }} value={phoneNumber} onChange={handlePhoneNumber}/>
              </div>
            </Grid>
            <Grid item xs={12}>
            <Button type='submit' variant="contained" style={{ backgroundColor: isFormValid ? activeColor : inactiveColor, color: 'white' }} fullWidth disabled={!isFormValid}>
              회원가입
            </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  )
}

export default SignUpPage