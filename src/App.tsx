import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './pages/header/Header';
import LogInPage from 'account/pages/LogInPage';
import Home from 'pages/Home';
import SignUpHome from 'account/pages/SignUpHome';
import SignUpPage from 'account/pages/SignUpPage';
import AccessSignUpPage from 'account/pages/AccessSignUpPage';

function App(): JSX.Element {
  // 로그인 상태 확인
  const isLoggedIn = !!localStorage.getItem('userToken');

  return (
    <BrowserRouter>
      <div>
        {/* 헤더 라우터 설정 */}
        <Header isLoggedIn={isLoggedIn}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signupHome" element={<SignUpHome />} />
          </Routes>
        </Header>
      </div>
      <div>
        {/* 일반 라우터 설정 */}
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signupHome" element={<SignUpHome />} />
          <Route path="/access-signup" element={<AccessSignUpPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;