import App from 'App';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RefreshToken() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // axios instance 생성
    const refreshAPI = axios.create({
      baseURL:'http://localhost:7777', // url설정
      headers: { "Content-type": "application/json" },
    })

    const interceptor = axios.interceptors.response.use(
        // response 가 정상적으로 오는 경우
        function (response) {
          console.log("응답하니?", response)
          return response
        },
        async function (error) {
          // 기존에 수행하려 했던 작업
          const originalConfig = error.config
          // 백에서 error response 로 보내준 message
          const message = error.response.data.message
          // 현재 발생한 에러 코드
          const status = error.response.status

          // accessToken 재발급
          if (status == 401) {
            if (message == "access token expired") {
              await refreshAPI({
                url: 'http://localhost:7777/account/reissue',
                method: "post",
                headers: {
                  accessToken: localStorage.getItem("token"),
                  refreshToken: localStorage.getItem("refreshToken")
                },
              })
              .then((res) => {
                localStorage.setItem("token", res.data.accessToken)

                originalConfig.headers["Authorization"] = "Bearer" + res.data.acccessToken
                
                return refreshAPI(originalConfig)
              })
              .then((res) => {
                window.location.reload();
              })
            }
            else if (message === "refresh token expired") {
              localStorage.clear();
              navigate("/login")
              window.alert("로그아웃 되었습니다.")
            }
            else if (message === "mail token expired") {
                window.alert("비밀번호 변경 시간이 만료되었습니다. 다시 요청해 주세요.")
            }
          }
          else if (status === 400 || status === 404 || status === 409) {
            window.alert(message)
          }
          return Promise.reject(error)
        }
      )
      return () => {
        axios.interceptors.response.eject(interceptor)
      }
  }, [])
  return <></>
}