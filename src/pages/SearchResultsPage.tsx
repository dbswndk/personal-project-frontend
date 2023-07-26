import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBoardList } from 'pages/api/HeaderApi';
import { Board } from 'board/entity/Board';

const SearchResultsPage: React.FC = () => {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState<Board[]>([]);

  useEffect(() => {
    console.log('Search Term:', searchTerm);
    if (searchTerm) {
      fetchBoardList(searchTerm)
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
      {searchResults.length > 0 ? (
        <div>
          {searchResults.map((board) => (
            <div key={board.boardId}>{board.title}</div>
          ))}
        </div>
      ) : (
        <div>검색 결과가 없습니다</div>
      )}
    </div>
  );
};

export default SearchResultsPage;
