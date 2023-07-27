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
      <div className='navbar'>
        <Link className='PetCareFinder' to={'/'}>PetCareFinder</Link>
        <SearchBar/>
        {isLoggedIn ? (
          <>
            <button className='Menu-logout' onClick={handleLogout}>로그아웃</button>
            <Link className='Menu' to={'/myPage'}>마이페이지</Link>
            <Link className='Menu' to={'/board'}>게시판</Link>
            <Link className='Menu' to={'/map'}>병원찾기</Link>
          </>
        ) : (
          <>
            <Link className='Menu' to={'/login'}>로그인</Link>
            <Link className='Menu' to={'/signupHome'}>회원가입</Link>
            <Link className='Menu' to={'/board'}>게시판</Link>
            <Link className='Menu' to={'/map'}>병원찾기</Link>
            <Link className='Menu' to={'/image'}>이미지</Link>
          </>
        )}
      </div>
      {children}
    </div>
  );
};

export default Header;
