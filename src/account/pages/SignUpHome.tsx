import React from 'react';
import { Link } from 'react-router-dom';
import './css/TotalSignUpPage.css'; 

const TotalSignUpPage = () => {
  return (
    <div className="total-signup-page">
      <h1>SignUp</h1>
      <div className="button-container"> 
        <Link to="/signup" className="page-button">회원 가입</Link>
        <Link to="/access-signup" className="page-button">관리자 회원 가입</Link>
      </div>
    </div>
  );
};

export default TotalSignUpPage;