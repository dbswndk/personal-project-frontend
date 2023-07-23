import { BoardMap } from "map/entity/BoardMap"
import useBoardMapStore from "map/store/BoardMapStore"
import { UseQueryResult, useQuery } from "react-query"
import axiosInstance from "utility/axiosInstance"

// 리뷰 리스트
export const fetchBoardList = async (placeName: string): Promise<BoardMap[]> => {
  const response = await axiosInstance.springAxiosInst.get<BoardMap[]>(`/map/boardMapList/${encodeURIComponent(placeName)}`);
  return response.data
}
  
export const useBoardListQuery = (placeName: string): UseQueryResult<BoardMap[], unknown> => {
  const setBoards = useBoardMapStore((state) => state.setBoards);
    
  const queryResult: UseQueryResult<BoardMap[], unknown> = useQuery(['boardList', placeName], () => fetchBoardList(placeName), {
    onSuccess: (data) => {
      setBoards(data);
    }
  });
    
  return queryResult;
};

// 리뷰 등록
export const registerBoard = async (
  data: { title: string; content: string }
): Promise<BoardMap> => {
  const response = await axiosInstance.springAxiosInst.post<BoardMap>('/map/boardMapRegister', data, {
    headers: {
      Authorization: localStorage.getItem('accessToken'),
      "Content-Type": "application/json",
    },
  });
  return response.data;
};