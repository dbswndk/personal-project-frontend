import axiosInstance from "../../utility/axiosInstance";
import { Account } from "../entity/Account";

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

export const checkEmailDuplicate = async (email: string) => {
  try {
    const response = await axiosInstance.springAxiosInst.get(`/account/check-email/${email}`);
    return response.data; // 서버 응답 데이터 반환
  } catch (error) {
    console.error('이메일 중복 확인 오류:', error);
    throw error;
  }
};

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

export const accessSignupAccount = async (
  data: { email: string; password: string; roleType?: string; accessNumber: string; }
  ): Promise<Account> => {
    const setData = {
      ...data,
      roleType: data.roleType || 'ADMIN' // roleType이 없을 경우 기본값으로 'NORMAL' 설정
    };
    const response = await axiosInstance.springAxiosInst.post<Account>('/account/admin-sign-up', setData);
    console.log('관리자 회원 가입 정보:', setData);
    return response.data;
  };