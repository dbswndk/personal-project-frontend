import { Button, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { fetchBoardList, useBoardListQuery } from 'map/api/BoardMapApi'
import useBoardMapStore from 'map/store/BoardMapStore'
import { useAuth } from 'pages/AuthConText'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MapBoardListPage = () => {
  const { data: boards, isLoading, isError } = useBoardListQuery()
  const { checkAuthorization } = useAuth()
  const setBoards = useBoardMapStore((state) => state.setBoards)
  const Navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBoardList()
      setBoards(data)
    }

    fetchData()
  }, [setBoards])

  // if (isLoading) {
  //   return<CircularProgress/>
  // }

  // if (isError) {
  //   return <Typography>에러 발생</Typography>
  // }

  const handleRowClick = (boardId: number) => {
    const isAuthorized = checkAuthorization();
    if (isAuthorized) {
      // Navigate(`/read/${boardId}`);
    } else {
      // Navigate('/login');
    }
  };

  const handleWriteClick = () => {
    const isAuthorized = checkAuthorization();

    if (isAuthorized) {
      // Navigate('/register');
    } else {
      // Navigate('/login');
    }
  };

  return (
    <Container maxWidth="lg">
      {/* <Button variant="contained" onClick={handleWriteClick}
            color="primary" style={{ marginTop: '20px' }}>
          글쓰기
        </Button> */}
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
              { boards?.length ===0 ? (
                <TableRow>
                  <TableCell colSpan={3} align='center'>등록된 게시물이 없습니다</TableCell>
                </TableRow>
              ) : (
              // 여기가 boardList를 뿌리는 곳
                boards?.map((board) => (
                  <TableRow key={board?.boardId} onClick={() => handleRowClick(board?.boardId)} style={{ cursor: 'pointer' }}>
                    <TableCell>{ board.title }</TableCell>
                    <TableCell>{ board.writer }</TableCell>
                    <TableCell>{ new Date(board.createdData).toISOString().slice(0, 10) }</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" onClick={handleWriteClick}
            color="primary" style={{ marginTop: '20px' }}>
          글쓰기
        </Button>
    </Container>
  )
}

export default MapBoardListPage