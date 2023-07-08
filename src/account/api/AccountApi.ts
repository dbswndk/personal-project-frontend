import axiosInstance from "../../utility/axiosInstance";
import { Account } from "../entity/Account";

export const signupAccount = async (
  data: { email: string; password: string; name: string; phoneNumber: string }
): Promise<Account> => {
  const response = await axiosInstance.springAxiosInst.post<Account>('/account/sign-up', data)
  console.log('회원가입 정보:', data)
  return response.data
}

export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.springAxiosInst.get<any>(`/account/check-email/${email}`);
    return response.data.isDuplicate; // isDuplicate 필드 값을 반환
  } catch (error) {
    // 오류 처리
    console.error('이메일 중복 확인 오류:', error);
    throw error;
  }
};