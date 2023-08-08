import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";

import Day from "./graphlist/day";
import Week from "./graphlist/week";
import Month from "./graphlist/month";

const SpaceBox = styled.div`
  display: flex;
  width: 3rem;
  height: 4.5rem;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85vw;
  height: 34vh;
  background-color: rgba(241, 208, 10, 0.92);
  border-radius: 1rem;
  margin: auto;
`;

const ChartBox = styled.div`
  display: flex;
  width: 85vw;
  height: 29vh;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-radius: 1rem 1rem 0rem 0rem;
`;

const ChartBtnBox = styled.div`
  display: flex;
  width: 85vw;
  height: 5vh;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const BtnBox = styled.div`
  display: flex;
  width: 33%;
  justify-content: center;
  color: ${({ isActive }) => (isActive ? "#FF3165" : "#3E497A")};
`;

const StockBox = styled.div`
  display: flex;
  width: 18rem;
  height: 13.5rem;
  margin: auto;
  background-color: coral;
  z-index: 1;
`;

const DetailGraph = () => {
  const { StockID } = useParams();
  const [active, setActive] = useState("Day");

  return (
    <>
      <SpaceBox></SpaceBox>
      <ChartContainer>
        <ChartBox>
          {active === "Day" && (
            <StockBox>
              <Day StockID={StockID} />
            </StockBox>
          )}
          {active === "Week" && (
            <StockBox>
              <Week StockID={StockID} />
            </StockBox>
          )}
          {active === "Month" && (
            <StockBox>
              <Month StockID={StockID} />
            </StockBox>
          )}
        </ChartBox>

        <ChartBtnBox>
          <BtnBox isActive={active === "Day"} onClick={() => setActive("Day")}>
            1일
          </BtnBox>
          <BtnBox
            isActive={active === "Week"}
            onClick={() => setActive("Week")}
          >
            2주
          </BtnBox>
          <BtnBox
            isActive={active === "Month"}
            onClick={() => setActive("Month")}
          >
            1달
          </BtnBox>
        </ChartBtnBox>
      </ChartContainer>
      <br />
    </>
  );
};

export default DetailGraph;
