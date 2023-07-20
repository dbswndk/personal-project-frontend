import { UseQueryResult, useQuery } from "react-query";
import axiosInstance from "../../utility/axiosInstance";
import { Account } from "../entity/Account";

// 회원 가입
export const signupAccount = async (
  data: { email: string; password: string; name: string; phoneNumber: string; roleType?: string }
  ): Promise<Account> => {
    const setData = {
      ...data,
      roleType: data.roleType || 'NORMAL' // roleType이 없을 경우 기본값으로 'NORMAL' 설정
    };
    const response = await axiosInstance.springAxiosInst.post<Account>('/account/sign-up', setData);
    console.log('회원가입 정보:', setData);
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
    return response.data; // 서버 응답 데이터 반환
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
    console.log('로그인 정보:', data);
    console.log('이메일', data.email)
    return response.data;
  } catch (error) {
    // 오류 처리
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
    console.log('관리자 회원 가입 정보:', setData);
    return response.data;
  };