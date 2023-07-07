import axiosInstance from "../../utility/axiosInstance";
import { Account } from "../entity/Account";


export const signupAccount = async (
  data: { email: string; password: string; name: string; phoneNumber: string }
): Promise<Account> => {
  const response = await axiosInstance.springAxiosInst.post<Account>('/account/sign-up', data)
  console.log('회원가입 정보:', data)
  return response.data
}