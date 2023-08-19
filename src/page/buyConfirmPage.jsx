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

const BuyConfirmPage = () => {
  return (
    <>
      <TopBar></TopBar>
      <CompleteBox>
        <CompleteCheck>
          <img src={Check} alt="거래 완료"></img>
        </CompleteCheck>
        <CompleteText>구매 완료 !</CompleteText>
      </CompleteBox>
      <BottomBar></BottomBar>
    </>
  );
};

export default BuyConfirmPage;
