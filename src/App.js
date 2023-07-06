import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUpPage from './pages/SignUpPage';
import Header from './pages/header/Header';

function App () {
  return (
    <BrowserRouter>
      <div>
        <Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </Header>
      </div>
    </BrowserRouter>
  );
};

export default App;


