import React, { ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useAuth } from 'pages/AuthConText';

type HeaderProps = {
  children?: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();


  const handleLogout = () => {
    // accessToken 토큰 삭제
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // 페이지 로드 시 로그인 상태 확인
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <div className='navbar'>
        <Link className='Menu' to={'/'}>홈</Link>
        {isLoggedIn ? (
          <>
            <button className='Menu-logout' onClick={handleLogout}>로그아웃</button>
            <Link className='Menu' to={'/myPage'}>마이페이지</Link>
            <Link className='Menu' to={'/board'}>게시판</Link>
          </>
        ) : (
          <>
            <Link className='Menu' to={'/login'}>로그인</Link>
            <Link className='Menu' to={'/signupHome'}>회원가입</Link>
            <Link className='Menu' to={'/board'}>게시판</Link>
          </>
        )}
      </div>
      {children}
    </div>
  );
};

export default Header;
