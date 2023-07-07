import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

type HeaderProps = {
  children: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <div>
      <div className='navbar'>
        <Link className='Mene' to={'/'}>홈</Link>
        <Link className='Mene' to={'/signup'}>회원가입</Link>
      </div>
      {children}
    </div>
  );
};

export default Header;