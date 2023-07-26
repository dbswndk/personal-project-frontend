import { fetchBoardKeywordList } from 'pages/api/HeaderApi';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hasCalledApi, setHasCalledApi] = useState<boolean>(false);
  const navigate = useNavigate();

  const callApiAndNavigate = async () => {
    if (!hasCalledApi && searchTerm.trim() !== '') {
      await fetchBoardKeywordList(searchTerm); 
      navigate(`/search/${searchTerm}`);
      setHasCalledApi(true);
    }
  };

  useEffect(() => {
    setHasCalledApi(false);
  }, []);

  useEffect(() => {
    return () => {
      setSearchTerm('');
    };
  }, [navigate]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      callApiAndNavigate();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setHasCalledApi(false);
  };

  const handleSearchButtonClick = () => {
    callApiAndNavigate();
  };

  return (
    <div className='search-bar-container'>
      <input
        type='text'
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder='검색'
      />
      <button className='search-button' onClick={handleSearchButtonClick}>
        검색
      </button>
    </div>
  );
};

export default SearchBar;
