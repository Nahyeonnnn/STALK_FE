import React from "react";
import styled from "styled-components";
import BottomBar from "../component/global/bottomBar";
import TopBar from "../component/global/topBar";
import Check from "./check.png";

const CompleteBox = styled.div`
  width: 12rem;
  height: 25vh;
  margin: auto;
  display: flex;
  position: relative;
  top: 30vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: #f1d00a;
  font-weight: bold;
`;

const CompleteCheck = styled.div``;

const CompleteText = styled.div``;

const SellConfirmPage = () => {
  return (
    <>
      <TopBar></TopBar>
      <CompleteBox>
        <CompleteCheck>
          <img src={Check}></img>
        </CompleteCheck>
        <CompleteText>판매 완료 !</CompleteText>
      </CompleteBox>
      <BottomBar></BottomBar>
    </>
  );
};

export default SellConfirmPage;
