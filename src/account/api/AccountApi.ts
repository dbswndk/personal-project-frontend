import { UseQueryResult, useQuery } from "react-query";
import axiosInstance from "../../utility/axiosInstance";
import { Account } from "../entity/Account";

// 회원 가입
export const signupAccount = async (
  data: { email: string; password: string; name: string; phoneNumber: string; roleType?: string }
  ): Promise<Account> => {
    const setData = {
      ...data,
      roleType: data.roleType || 'NORMAL' 
    };
    const response = await axiosInstance.springAxiosInst.post<Account>('/account/sign-up', setData);
    return response.data;
  };

// 마이 페이지
export const fetchAccount = async (): Promise<Account | null> => {
  const response = await axiosInstance.springAxiosInst.post('/account/myPage', {}, {
    headers: {
      Authorization: localStorage.getItem('accessToken'),
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const useAccountQuery = (): UseQueryResult<Account | null, unknown> => {
  const accessToken = localStorage.getItem('accessToken');
  return useQuery(['account'], () => fetchAccount(), { enabled: !!accessToken });
};

// 이메일 중복 확인
export const checkEmailDuplicate = async (email: string) => {
  try {
    const response = await axiosInstance.springAxiosInst.get(`/account/check-email/${email}`);
    return response.data;
  } catch (error) {
    console.error('이메일 중복 확인 오류:', error);
    throw error;
  }
};

// 로그인 
export const loginAccount = async (
  data: { email: string; password: string; }
): Promise<Account> => {
  try {
    const response = await axiosInstance.springAxiosInst.post<Account>('/account/log-in', data);
    localStorage.setItem('accountId', `${response.data.accountId}`)
    return response.data;
  } catch (error) {
    console.error('로그인 오류:', error);
    throw error;
  }
};

// 관리자 회원 가입 
export const accessSignupAccount = async (
  data: { email: string; password: string; roleType?: string; accessNumber: string; }
  ): Promise<Account> => {
    const setData = {
      ...data,
      roleType: data.roleType || 'ADMIN'
    };
    const response = await axiosInstance.springAxiosInst.post<Account>('/account/admin-sign-up', setData);
    return response.data;
  };