import React from "react";
import KakaoLoginBox from "../component/login/kakaoLoginBox";
import StalkLogo from "../component/login/StalkLogo";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginDiv = styled.div`
  display: block;
  text-align: center;
`;

const MainBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  color: #f1d00a;
  text-decoration: underline;
  font-size: 1rem;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  function moveToMain(){
    navigate(`/main`);
  }
  return (
    <LoginDiv>
      <StalkLogo></StalkLogo>
      <KakaoLoginBox></KakaoLoginBox>
      <MainBtn onClick={moveToMain}>둘러보기</MainBtn>
    </LoginDiv>
  );
};

export default LoginPage;
