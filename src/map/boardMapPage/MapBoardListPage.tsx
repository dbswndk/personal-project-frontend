import { Button, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { fetchBoardList, useBoardListQuery } from 'map/api/BoardMapApi'
import useBoardMapStore from 'map/store/BoardMapStore'
import { useAuth } from 'pages/AuthConText'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MapBoardRegisterPage from './MapBoardRegisterPage'
import MapBoardReadPage from './MapBoardReadPage'

interface MapBoardListPageProps {
  place_name: string; 
}

const MapBoardListPage: React.FC<MapBoardListPageProps> = ({ place_name }) => {
  const [isWriting, setIsWriting] = useState(false);
  const [isReading, setIsReading] = useState<number | null>(null); 
  const { data: boards, isLoading, isError } = useBoardListQuery(place_name);
  const { checkAuthorization } = useAuth();
  const setBoards = useBoardMapStore((state) => state.setBoards);
  const Navigate = useNavigate();

  useEffect(() => {
    if (isWriting !== null || isReading !== null) {
      return;
    }

    const fetchData = async () => {
      if (place_name) {
        const data = await fetchBoardList(place_name);
        setBoards(data);
      }
    };

    fetchData();
  }, [place_name, setBoards, isWriting, isReading]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography>에러 발생</Typography>;
  }

  const handleRowClick = (boardMapId: number) => {
    const isAuthorized = checkAuthorization();
    if (isAuthorized) {
      setIsReading(boardMapId);
    } else {
      Navigate('/login');
    }
  };

  const handleWriteClick = () => {
    const isAuthorized = checkAuthorization();

    if (isAuthorized) {
      setIsWriting(true); 
    } else {
      Navigate('/login');
    }
  };

  return (
    <Container maxWidth="lg">
      {isWriting ? (
        <MapBoardRegisterPage place_name={place_name} setIsWriting={setIsWriting} />
      ) : (
        <React.Fragment>
          {isReading ? (
            <MapBoardReadPage place_name={place_name} boardMapId={isReading} setIsReading={setIsReading} />
          ) : (
            <React.Fragment>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="board table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: '50%'}}>제목</TableCell>
                      <TableCell align='right'>작성자</TableCell>
                      <TableCell align='right'>작성일자</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { boards?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} align='center'>등록된 게시물이 없습니다</TableCell>
                      </TableRow>
                    ) : (
                      boards?.map((board) => (
                        <TableRow key={board?.boardMapId} onClick={() => handleRowClick(board?.boardMapId)} style={{ cursor: 'pointer' }}>
                          <TableCell>{ board.title }</TableCell>
                          <TableCell>{ board.writer }</TableCell>
                          <TableCell>{ new Date(board.createdData).toISOString().slice(0, 10) }</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button variant="contained" onClick={() => handleWriteClick()} style={{ marginTop: '20px' }} className='board-write-button'>
                글쓰기
              </Button>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </Container>
  );
};

export default MapBoardListPage;
