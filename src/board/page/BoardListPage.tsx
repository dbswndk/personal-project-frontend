import React, { useEffect } from 'react'
import { Button, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { fetchBoardList, useBoardListQuery } from '../api/BoardApi'
import useBoardStore from '../store/BoardStore'
import { useAuth } from 'pages/AuthConText'

const BoardListPage = () => {
  const { data: boards, isLoading, isError } = useBoardListQuery()
  const { checkAuthorization } = useAuth();
  const setBoards = useBoardStore((state) => state.setBoards)
  const Navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBoardList()
      console.log(data)
      setBoards(data)
    }

    fetchData()
  }, [setBoards])

  if (isLoading) {
    return <CircularProgress/>
  }

  if (isError) {
    return <Typography>리스트를 가져오는 도중 에러가 발생했습니다</Typography>
  }

  const handleRowClick = (boardId: number) => {
    Navigate(`/read/${boardId}`)
  }

  const handleWriteClick = () => {
    // 사용자의 인증 상태 확인
    const isAuthorized = checkAuthorization();

    if (isAuthorized) {
      // 사용자가 인증되었다면 글쓰기 페이지로 이동
      Navigate('/register');
    } else {
      // 사용자가 인증되지 않았다면 알림을 띄우고 로그인 페이지로 이동
      Navigate('/login');
    }
  };

  return (
    <Container maxWidth="lg">
      <Button variant="contained" onClick={handleWriteClick}
            color="primary" style={{ marginTop: '20px' }}>
          글쓰기
        </Button>
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
                  <TableRow key={board.boardId} onClick={() => handleRowClick(board.boardId)} style={{ cursor: 'pointer' }}>
                    <TableCell>{ board.title }</TableCell>
                    <TableCell>{ board.writer }</TableCell>
                    {/* 작성날짜만 나오게 표시 */}
                    <TableCell>{ new Date(board.createdData).toISOString().slice(0, 10) }</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
    </Container>
  )
}

export default BoardListPage