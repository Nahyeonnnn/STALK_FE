import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AmountBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 4rem;
  align-items: center;
`;

const AmountTextLeft = styled.p`
  color: white;
  font-size: larger;
`;

const AmountTextRight = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50vw;
  color: rgba(241, 208, 10, 0.92);
`;

const AmountTextRightRate = styled.div`
  display: flex;
  color: ${(props) => (props.value.startsWith("-") ? "skyblue" : "red")};
`;

const InvestBox = styled.div`
  padding: 1rem 2rem 3rem 2rem;
`;

const InvestContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80vw;
  height: 12vw;
  color: white;
  font-size: 1.2rem;
`;

const InvestName = styled.div`
  width: 30vw;
`;

const InvestPrice = styled.div`
  width: 25vw;
  display: flex;
  justify-content: flex-end;
`;

const InvestRate = styled.div`
  width: 25vw;
  display: flex;
  justify-content: flex-end;
  color: ${(props) => (props.value.startsWith("-") ? "skyblue" : "red")};
`;

const MainMyInvest = () => {
  const [stockData, setStockData] = useState([]);
  const navigate = useNavigate();

  const stockCode = "005930"; // 이 부분은 실제 주식 코드 값으로 대체되어야 합니다.

  const handleStockClick = () => {
    navigate(`/detail/${stockCode}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://stalksound.store/sonification/week_data/",
          {
            params: {
              // symbol: `${props.StockID}`,
              symbol: stockCode,
              begin: "20230807",
              end: "20230807",
            },
          }
        );
        setStockData(response.data);
        console.log(response.data);
        console.log(response.data.data);
        console.log(response.data.data[0]);
        console.log(response.data.data[0].종목);
      } catch (error) {
        console.error("종목명 가져오기 실패 ", error);
      }
    };

    fetchData();
  }, []);

  const stockName =
    stockData.data && stockData.data[0] ? stockData.data[0].종목 : null;
  const stockPrice =
    stockData.data && stockData.data[0] ? stockData.data[0].시가 : null;

  return (
    <>
      <AmountBox>
        <AmountTextLeft>총 자산</AmountTextLeft>
        <AmountTextRight>
          93,214,620원{" "}
          <AmountTextRightRate value="+ 15.2%"> (+ 15.2%)</AmountTextRightRate>
        </AmountTextRight>
      </AmountBox>
      <InvestBox>
        <InvestContainer>
          <InvestName>{stockName}</InvestName>
          <InvestPrice>{stockPrice} $</InvestPrice>
          <InvestRate value="+0,09%">+0,09%</InvestRate>
        </InvestContainer>
        <InvestContainer>
          <InvestName>TESLA</InvestName>
          <InvestPrice>2,341 $</InvestPrice>
          <InvestRate value="+0,84%">+0,84%</InvestRate>
        </InvestContainer>
        <InvestContainer>
          <InvestName>MICROSOFT</InvestName>
          <InvestPrice>10,321 $</InvestPrice>
          <InvestRate value="-10,32%">-10,32%</InvestRate>
        </InvestContainer>
        <InvestContainer>
          <InvestName>APPLE</InvestName>
          <InvestPrice>132,389 $</InvestPrice>
          <InvestRate value="+8,39%">+8,39%</InvestRate>
        </InvestContainer>
        <InvestContainer>
          <InvestName>Alphabet</InvestName>
          <InvestPrice>32,445 $</InvestPrice>
          <InvestRate value="-5,39%">-5,39%</InvestRate>
        </InvestContainer>
        <InvestContainer>
          <InvestName>NETFLIX</InvestName>
          <InvestPrice>3,429 $</InvestPrice>
          <InvestRate value="-0,51%">-0,51%</InvestRate>
        </InvestContainer>
        <InvestContainer>
          <InvestName>AT&T Inc.</InvestName>
          <InvestPrice>32,445 $</InvestPrice>
          <InvestRate value="+0,09%">+0,09%</InvestRate>
        </InvestContainer>
      </InvestBox>
    </>
  );
};

export default MainMyInvest;
