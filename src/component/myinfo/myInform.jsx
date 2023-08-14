import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TextBox = styled.div`
  display: flex;
  justify-content: center; /* 가로 방향 중앙 정렬 */
  //align-items: center; /* 세로 방향 중앙 정렬 */
  //height: 100vh; /* 부모 요소의 높이를 설정해야 수직 정렬이 정확히 보입니다. */
  flex-direction: column;
`;

const Text = styled.p`
  color: #fff;
  text-align: center;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 110%; /* 22px */
  letter-spacing: -0.0313rem;
  margin-top: 5rem;
`;

const EmailText = styled.p`
  color: #8f8f8f;
  text-align: center;
  font-family: Inter;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 500;
  line-height: 220%; /* 22px */
  letter-spacing: -0.0156rem;
  margin-top: -1rem;
`;

const MyInform = () => {
  const [userName, setUserName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://stalksound.store/sonification/user_info/"
        );
        // setUserName(response.data);
        console.log(response.data.유저정보);
        // console.log(response.data.유저정보.username);
        setUserName(response.data.유저정보.username);
        console.log(userName);
      } catch (error) {
        console.error("userinfo 가져오기 실패 ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <TextBox>
        <Text>{userName}님 안녕하세요! </Text>
        <EmailText>{userName}의 이메일</EmailText>
      </TextBox>
    </>
  );
};

export default MyInform;
