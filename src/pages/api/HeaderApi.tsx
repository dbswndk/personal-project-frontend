import { Board } from "board/entity/Board";
import useBoardStore from "board/store/BoardStore";
import { UseQueryResult, useQuery } from "react-query";
import axiosInstance from "utility/axiosInstance";

export const fetchBoardList = async (keyword: string): Promise<Board[]> => {
  if (!keyword.trim()) {
    return [];
  }
  const response = await axiosInstance.springAxiosInst.get<Board[]>(`/board/search/${keyword}`, {
    params: {
        keyword,
    },
  });
  console.log('동작', response.data)
  return response.data;
};
  
export const useBoardListQuery = (keyword: string): UseQueryResult<Board[], unknown> => {
  const setBoards = useBoardStore((state) => state.setBoards);
  
  const queryResult: UseQueryResult<Board[], unknown> = useQuery(['boardList', keyword], () =>
    fetchBoardList(keyword || '')
  );
  
  return queryResult;
};
