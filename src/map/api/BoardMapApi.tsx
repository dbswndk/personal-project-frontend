import { BoardMap } from "map/entity/BoardMap"
import useBoardMapStore from "map/store/BoardMapStore"
import { UseQueryResult, useQuery } from "react-query"
import axiosInstance from "utility/axiosInstance"

export const fetchBoardList = async (): Promise<BoardMap[]> => {
  const response = await axiosInstance.springAxiosInst.get<BoardMap[]>('/map/boardMapList')
  return response.data
}
  
export const useBoardListQuery = (): UseQueryResult<BoardMap[], unknown> => {
  const setBoards = useBoardMapStore((state) => state.setBoards)
  
  const queryResult: UseQueryResult<BoardMap[], unknown> = useQuery('boardList', fetchBoardList, {
    onSuccess: (data) => {
      setBoards(data)
    }
  })
  
  return queryResult
}