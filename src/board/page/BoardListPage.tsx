import React, { useEffect } from 'react'
import { Button, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { fetchBoardList, useBoardListQuery } from '../api/BoardApi'
import useBoardStore from '../store/BoardStore'

const TypeScriptBoardListPage = () => {
  const { data: boards, isLoading, isError } = useBoardListQuery()
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

  return (
    <Container maxWidth="lg">
      <Button component={Link} to="/register" variant="contained"
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
                    {/* back 에서 createdDate 라고 작성되있어서 createData론 안나옴 */}
                    <TableCell>{ board.createdData }</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
    </Container>
  )
}

export default TypeScriptBoardListPage