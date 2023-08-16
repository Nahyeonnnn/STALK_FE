import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

const TextBox = styled.div`
  display: flex;
  margin-top: 3rem;
  margin-left: 2.5rem;
`;

const Text = styled.p`
  display: flex;
  font-weight: bold;
  color: white;
`;

const MainInfo = () => {

  const [userName, setUserName] = useState();

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://stalksound.store/sonification/user_info/`
        );
        setUserName(response.data.유저정보.user_nickname);
        console.log(response.data);
      } catch (error) {
        console.error("userinfo 가져오기 실패", error);
      }
    };

    fetchData();
  },[]);

  return (
    <>
      <TextBox>
        <Text>
          환영합니다!<br></br> {userName}님
        </Text>
      </TextBox>
    </>
  );
};

export default MainInfo;
