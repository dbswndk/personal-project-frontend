import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

type HeaderProps = {
  isLoggedIn: boolean;
  children: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // 유저 토큰 삭제
    localStorage.removeItem('userToken');
    // 로그아웃 상태로 변경
    setIsLoggedIn(false);
  };

  return (
    <div>
      <div className='navbar'>
        {isLoggedIn ? (
          <button className='Menu' onClick={handleLogout}>로그아웃</button>
        ) : (
          <>
            <Link className='Menu' to={'/'}>홈</Link>
            <Link className='Menu' to={'/login'}>로그인</Link>
            <Link className='Menu' to={'/signupHome'}>회원가입</Link>
          </>
        )}
      </div>
      {children}
    </div>
  );
};

export default Header;
