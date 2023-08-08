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

const Invest_1 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80vw;
  height: 12vw;
  color: white;
  font-size: 1.2rem;
`;

const Invest_1_name = styled.div`
  width: 30vw;
`;

const Invest_1_price = styled.div`
  width: 25vw;
  display: flex;
  justify-content: flex-end;
`;

const Invest_1_rate = styled.div`
  width: 25vw;
  display: flex;
  justify-content: flex-end;
  color: ${(props) => (props.value.startsWith("-") ? "skyblue" : "red")};
`;

const MainMyInvest = () => {
  const [stockData, setStockData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://stalksound.store/sonification/week_data/",
          {
            params: {
              // symbol: `${props.StockID}`,
              symbol: "005930",
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

  const handleStockClick = () => {
    const stockCode = "someValue"; // 이 부분은 실제 주식 코드 값으로 대체되어야 합니다.
    navigate(`/detail/${stockCode}`);
  };

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
        <Invest_1>
          <Invest_1_name>{stockName}</Invest_1_name>
          <Invest_1_price>{stockPrice} $</Invest_1_price>
          <Invest_1_rate value="+0,09%">+0,09%</Invest_1_rate>
        </Invest_1>
        <Invest_1>
          <Invest_1_name>TESLA</Invest_1_name>
          <Invest_1_price>2,341 $</Invest_1_price>
          <Invest_1_rate value="+0,84%">+0,84%</Invest_1_rate>
        </Invest_1>
        <Invest_1>
          <Invest_1_name>MICROSOFT</Invest_1_name>
          <Invest_1_price>10,321 $</Invest_1_price>
          <Invest_1_rate value="-10,32%">-10,32%</Invest_1_rate>
        </Invest_1>
        <Invest_1>
          <Invest_1_name>APPLE</Invest_1_name>
          <Invest_1_price>132,389 $</Invest_1_price>
          <Invest_1_rate value="+8,39%">+8,39%</Invest_1_rate>
        </Invest_1>
        <Invest_1>
          <Invest_1_name>Alphabet</Invest_1_name>
          <Invest_1_price>32,445 $</Invest_1_price>
          <Invest_1_rate value="-5,39%">-5,39%</Invest_1_rate>
        </Invest_1>
        <Invest_1>
          <Invest_1_name>NETFLIX</Invest_1_name>
          <Invest_1_price>3,429 $</Invest_1_price>
          <Invest_1_rate value="-0,51%">-0,51%</Invest_1_rate>
        </Invest_1>
        <Invest_1>
          <Invest_1_name>AT&T Inc.</Invest_1_name>
          <Invest_1_price>32,445 $</Invest_1_price>
          <Invest_1_rate value="+0,09%">+0,09%</Invest_1_rate>
        </Invest_1>
      </InvestBox>
    </>
  );
};

export default MainMyInvest;
