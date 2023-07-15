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
export const fetchAccount = async (accountId: string, accessToken: string): Promise<Account | null> => {
  try {
    const response = await axiosInstance.springAxiosInst.post('/account/myPage', null, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    // 일단 토큰을 보내고 여기까지 온건 확인
    console.log('여기까지 오긴했니')
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 403) {
        console.log('접근 거부: 403 오류', error);
        window.location.href = '/login'; // 사용자를 로그인 페이지로 리디렉션
        alert('접근이 거부되었습니다. 로그인이 필요합니다.');
    } else {
        console.log('계정을 가져오는 중 오류 발생:', error);
        alert('계정을 가져오는 중 오류가 발생했습니다.');
    }
    throw error;
}

};

export const useAccountQuery = (accountId: string, accessToken: string): UseQueryResult<Account | null, unknown> => {
  return useQuery(['account', accountId], () => fetchAccount(accountId, accessToken));
};

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
  data: { email: string; password: string; accessToken: string; }
): Promise<Account> => {
  try {
    const response = await axiosInstance.springAxiosInst.post<Account>('/account/log-in', data);
    console.log('로그인 정보:', data);
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