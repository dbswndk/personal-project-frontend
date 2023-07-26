import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBoardKeywordList } from 'pages/api/HeaderApi';
import BoardListPage from 'board/page/BoardListPage';
import { Board } from 'board/entity/Board';

const SearchResultsPage: React.FC = () => {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState<Board[]>([]);

  useEffect(() => {
    if (searchTerm) {
      fetchBoardKeywordList(searchTerm)
        .then((boardListData) => {
          setSearchResults(boardListData);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
          setSearchResults([]);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div>
      <BoardListPage searchResults={searchResults} />
    </div>
  );
};

export default SearchResultsPage;
