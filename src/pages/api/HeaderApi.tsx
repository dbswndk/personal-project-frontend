import { Board } from "board/entity/Board";
import useBoardStore from "board/store/BoardStore";
import { UseQueryResult, useQuery } from "react-query";
import axiosInstance from "utility/axiosInstance";

export const fetchBoardKeywordList = async (keyword: string): Promise<Board[]> => {
  if (!keyword.trim()) {
    return [];
  }
  const response = await axiosInstance.springAxiosInst.get<Board[]>(`/board/search/${keyword}`, {
    params: {
        keyword,
    },
  });
  return response.data;
};

