import React, { ReactNode, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';
import { useAuth } from 'pages/AuthConText';
import SearchBar from './SearchBar';

type HeaderProps = {
  children?: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accountId');
    setIsLoggedIn(false);
    alert('로그아웃했습니다.');
    navigate('/');
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <div className='top-bar'>
        <div className='menu-container'>
        <SearchBar />
          {isLoggedIn ? (
            <>
              <button className='Menu-logout' onClick={handleLogout}>로그아웃</button>
              <Link className='Menu' to={'/myPage'}>마이페이지</Link>
            </>
          ) : (
            <>
              <Link className='Menu' to={'/login'}>로그인</Link>
              <Link className='Menu' to={'/signupHome'}>회원가입</Link>
            </>
          )}
        </div>
      </div>
      <div className='bar'>
      <Link className='PetCareFinder' to={'/'}>
        <img src='img/logo.png' alt='PetCareFinder' />
      </Link>
      </div>
      <div className='navbar'>
        <div id="menu_under_line"></div>
        <div className='bottom-links'>
        <Link className='MenuImage' to={'/board'}>
          <img src='img/PETTALK.png' alt='PETTALK' />
        </Link>
        <Link className='MenuImage' to={'/map'}>
          <img src='img/병원찾기.png' alt='동물병원' />
        </Link>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
