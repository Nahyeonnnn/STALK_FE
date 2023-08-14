import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";

import Day from "./domesticGraphlist/day";
import Week from "./domesticGraphlist/week";
import Month from "./domesticGraphlist/month";
import Year from "./domesticGraphlist/year";

import Likebtn from "./likebtn/likebtn";

const SpaceBox = styled.div`
  display: flex;
  width: 3rem;
  height: 4.5rem;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85vw;
  /* height: 35vh; */
  background-color: rgba(241, 208, 10, 0.92);
  border-radius: 1rem;
  margin: auto;
`;

const ChartBox = styled.div`
  display: flex;
  background-color: white;
  width: 85vw;
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
  margin: auto;
  margin-bottom: -0.5rem;
  border-radius: 1rem;
`;

const DetailGraph = () => {
  const { StockID1 } = useParams();
  const [active, setActive] = useState("Day");

  return (
    <>
      <SpaceBox></SpaceBox>
      <ChartContainer>
        <Likebtn></Likebtn>
        <ChartBox>
          {active === "Day" && (
            <StockBox>
              <Day StockID={StockID1} />
            </StockBox>
          )}
          {active === "Week" && (
            <StockBox>
              <Week StockID={StockID1} />
            </StockBox>
          )}
          {active === "Month" && (
            <StockBox>
              <Month StockID={StockID1} />
            </StockBox>
          )}
          {active === "Year" && (
            <StockBox>
              <Year StockID={StockID1} />
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
            3달
          </BtnBox>
          <BtnBox
            isActive={active === "Year"}
            onClick={() => setActive("Year")}
          >
            1년
          </BtnBox>
        </ChartBtnBox>
      </ChartContainer>
      <br />
    </>
  );
};

export default DetailGraph;
