import { fetchBoardKeywordList } from 'pages/api/HeaderApi';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const SmallIconButton = styled(IconButton)(({ theme }) => ({
  fontSize: '8px', 
}));


const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hasCalledApi, setHasCalledApi] = useState<boolean>(false);
  const [isSearchBarVisible, setSearchBarVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const callApiAndNavigate = async () => {
    if (!hasCalledApi && searchTerm.trim() !== '') {
      await fetchBoardKeywordList(searchTerm); 
      navigate(`/search/${searchTerm}`);
      setHasCalledApi(true);
      setSearchBarVisible(false);
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

   const handleSearchIconClick = () => {
    setSearchBarVisible(!isSearchBarVisible);
  };

  return (
    <div className='search-bar-container'>
      {isSearchBarVisible ? (
        <input
          type='text'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder='검색'
          autoFocus
        />
      ) : (
        <SmallIconButton onClick={handleSearchIconClick}>
          <SearchIcon />
        </SmallIconButton>
      )}
      {isSearchBarVisible && (
        <SmallIconButton className='search-button' onClick={handleSearchButtonClick}>
          <SearchIcon />
        </SmallIconButton>
      )}
    </div>
  );
};

export default SearchBar;

