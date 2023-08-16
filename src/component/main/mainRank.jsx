import React, { useState } from "react";
import styled from "styled-components";
import TradeRank from './TradeRank';
import InterTradeRank from './InterTradeRank';
import StockInterest from "./StockInterest";

const RankOptionBox = styled.div`
  display: flex;
  width: 80vw;
  margin: auto;
  height: 5vh;
  justify-content: space-evenly;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const RankOptionBtn1 = styled.button`
  display: inline;
  width: auto;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  background-color: ${({ isActive }) =>
    isActive ? "rgba(241, 208, 10, 0.92)" : "white"};
`;

const RankOptionBtn2 = styled.button`
  display: inline;
  width: auto;
  border-radius: 1rem;
  background-color: ${({ isActive }) =>
    isActive ? "rgba(241, 208, 10, 0.92)" : "white"};
`;

const RankOptionBtn3 = styled.button`
  display: inline;
  width: auto;
  border-radius: 1rem;
  background-color: ${({ isActive }) =>
    isActive ? "rgba(241, 208, 10, 0.92)" : "white"};
`;


const MainRank = () => {
  const [active, setActive] = useState("1");

  return (
    <>
      <RankOptionBox>
        <RankOptionBtn1
          isActive={active === "1"}
          onClick={() => setActive("1")}
        >
          국내 인기
        </RankOptionBtn1>

        <RankOptionBtn2
          isActive={active === "2"}
          onClick={() => setActive("2")}
        >
          해외 인기
        </RankOptionBtn2>

        <RankOptionBtn3
          isActive={active === "5"}
          onClick={() => setActive("5")}
        >
          관심
        </RankOptionBtn3>
      
      </RankOptionBox>

      {active === "1" && <TradeRank/>}
      {active === "2" && <InterTradeRank/>}
      {active === "5" && <StockInterest/>}
    </>
  );
};

export default MainRank;
