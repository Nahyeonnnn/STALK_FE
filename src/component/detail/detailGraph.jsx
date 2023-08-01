import React from 'react';
import styled from "styled-components";
import { useState } from 'react';

const SpaceBox = styled.div`
  display: flex;
  width : 3rem;
  height : 4.5rem;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction : column;
  width: 85vw;
  height: 34vh;
  background-color: rgba(241, 208, 10, 0.92);
  border-radius: 1rem;
  margin : auto;
`;

const ChartBox = styled.div`
    display:flex;
    width: 85vw;
    height: 29vh;
    background-color : white;
    align-items : center;
    justify-content : center;
    border-radius: 1rem 1rem 0rem 0rem;
`

const DayChart = styled.div`
    display:flex;
    width: 78vw;
    height: 26vh;
    background-color : gray;
`

const WeekChart = styled.div`
    display:flex;
    width: 78vw;
    height: 26vh;
    background-color : pink;
`

const MonthChart = styled.div`
    display:flex;
    width: 78vw;
    height: 26vh;
    background-color : green;
`

const ChartBtnBox = styled.div`
    display:flex;
    width: 85vw;
    height: 5vh;
    align-items : center;
    justify-content : center;
    background-color : transparent;
`

const BtnBox = styled.div`
    display : flex;
    width : 33%;
    justify-content : center;
    color: ${({ isActive }) => isActive ? "#FF3165" : "#3E497A"};
`

const DetailGraph = () => {
    const [active, setActive] = useState("Day");

    return (
        <>  
            <SpaceBox></SpaceBox>
            <ChartContainer>
                <ChartBox>
                    {active === "Day" && <DayChart></DayChart>}
                    {active === "Week" && <WeekChart></WeekChart>}
                    {active === "Month" && <MonthChart></MonthChart>}
                </ChartBox>

                <ChartBtnBox>
                    <BtnBox isActive={active === "Day"} onClick={() => setActive("Day")}>1일</BtnBox>
                    <BtnBox isActive={active === "Week"} onClick={() => setActive("Week")}>1주</BtnBox>
                    <BtnBox isActive={active === "Month"} onClick={() => setActive("Month")}>1달</BtnBox>
                </ChartBtnBox>

            </ChartContainer>
            <br/>
        </>
    );
};

export default DetailGraph;