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

const MainInfo = ({ nickname }) => {
  return (
    <TextBox>
      <Text>
        환영합니다!<br /> {nickname}님
      </Text>
    </TextBox>
  );
};

export default MainInfo;
