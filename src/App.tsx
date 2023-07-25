import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './pages/header/Header';
import LogInPage from 'account/pages/LogInPage';
import Home from 'pages/Home';
import SignUpHome from 'account/pages/SignUpHome';
import SignUpPage from 'account/pages/SignUpPage';
import AccessSignUpPage from 'account/pages/AccessSignUpPage';
import RefreshToken from 'refreshToken/RefreshToken';
import MyInfoPage from 'account/pages/MyInfoPage';
import BoardListPage from 'board/page/BoardListPage';
import BoardRegisterPage from 'board/page/BoardRegisterPage';
import { AuthProvider } from 'pages/AuthConText';
import BoardReadPage from 'board/page/BoardReadPage';
import BoardModifyPage from 'board/page/BoardModifyPage';
import MapContainer from 'map/MapContainer';
import MapBoardListPage from 'map/boardMapPage/MapBoardListPage';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RefreshToken/>
          <div>
            {/* 헤더 라우터 설정 */}
              <Header>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<LogInPage />} />
                  <Route path="/signupHome" element={<SignUpHome />} />
                  <Route path="/myPage" element={<MyInfoPage />} />
                  <Route path="/board" element={<BoardListPage />} />
                  <Route path="/map" element={<MapContainer/>} />
                </Routes>
              </Header>
          </div>
          <div>
            {/* 일반 라우터 설정 */}
            <Routes>
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/access-signup" element={<AccessSignUpPage />} />
              <Route path="/register" element={<BoardRegisterPage />} />
              <Route path="/read/:boardId" element={<BoardReadPage/>} />
              <Route path="/modify/:boardId" element={<BoardModifyPage/>} />
              <Route path="/boardMapList/:place_name" element={<MapBoardListPage place_name="" />} />
            </Routes>
          </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
