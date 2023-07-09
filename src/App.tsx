import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './pages/header/Header';
import SignUpPage from './account/pages/SignUpPage';
import LogInPage from 'account/pages/LogInPage';
import Home from 'pages/Home';

function App(): JSX.Element {
  // 로그인 상태 확인
  const isLoggedIn = !!localStorage.getItem('userToken');

  return (
    <BrowserRouter>
      <div>
        <Header isLoggedIn={isLoggedIn}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </Header>
      </div>
    </BrowserRouter>
  );
}

export default App;
