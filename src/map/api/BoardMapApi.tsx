import { BoardMap } from "map/entity/BoardMap"
import useBoardMapStore from "map/store/BoardMapStore"
import { UseQueryResult, useQuery } from "react-query"
import axiosInstance from "utility/axiosInstance"

// 리뷰 리스트
export const fetchBoardList = async (place_name: string): Promise<BoardMap[]> => {
  const response = await axiosInstance.springAxiosInst.get<BoardMap[]>(`/map/boardMapList/${encodeURIComponent(place_name)}`);
  console.log('장소확인: ', place_name)
  return response.data;
};
  
export const useBoardListQuery = (place_name: string): UseQueryResult<BoardMap[], unknown> => {
  const setBoards = useBoardMapStore((state) => state.setBoards);
    
  const queryResult: UseQueryResult<BoardMap[], unknown> = useQuery(['boardList', place_name], () => fetchBoardList(place_name), {
    onSuccess: (data) => {
      setBoards(data);
    }
  });
    
  return queryResult;
};

// 리뷰 등록
export const registerBoard = async (place_name: string, data: { title: string; content: string; }): 
  Promise<BoardMap> => {
  const response = await axiosInstance.springAxiosInst.post<BoardMap>(`/map/boardMapRegister/${encodeURIComponent(place_name)}`, data, {
    headers: {
      Authorization: localStorage.getItem('accessToken'),
      "Content-Type": "application/json",
    },
  });
  console.log('placename: ', place_name)
  return response.data;
};

// 리뷰 읽기
export const fetchBoard = async (place_name: string, boardMapId: string): Promise<BoardMap | null> => {
  const response = await axiosInstance.springAxiosInst.get<BoardMap>(`/map/${encodeURIComponent(place_name)}/${boardMapId}`, {
    headers: {
      Authorization: localStorage.getItem('accessToken'),
      "Content-Type": "application/json",
    },
  })
  return response.data
}

export const useBoardQuery = (place_name: string, boardMapId: string): UseQueryResult<BoardMap | null, unknown> => {
  return useQuery(['board', boardMapId], () =>  fetchBoard(place_name, boardMapId))
}