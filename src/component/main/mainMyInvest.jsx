import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const AmountBox = styled.div`
  display: flex;
  flex-direction: column; /* Change to column direction */
  align-items: center; /* Center items horizontally */
  justify-content: space-evenly; /* Distribute space evenly between sections */
`;

const Container = styled.div`
  display: flex;
  flex-direction: row; /* Change to column direction */
`

const Container2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AmountTextLeft = styled.p`
display: flex;
font-size: large;
color: white;
`;

const AmountTextRight = styled.div`
  display: flex;
  color: rgba(241, 208, 10, 0.92);
  padding: 1rem;
`;

const AmountTextLeft1 = styled.p`
display: flex;
font-size: large;
color: white;
width : 40vw;
`;

const AmountTextRight1 = styled.div`
  display: flex;
  margin-top: 1.2rem;
  margin-left: 2rem;
  color: rgba(241, 208, 10, 0.92);
  font-size:large;
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
  width: 50vw;
`;

const InvestPrice = styled.div`
  width: 40vw;
  display: flex;
  justify-content: flex-end;
`;

const InvestRate = styled.div`
  width: 5vw;
  display: flex;
  justify-content: flex-end;
  color: ${({ value }) => (String(value).startsWith("-") ? "skyblue" : "red")};
  margin-left: 4rem;
`;

const Separator = styled.div`
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.7);
`;

// const formatNumberWithCommas = (number) => {
//   return number.toLocaleString();
// };

const MainMyInvest = () => {
  const [userInvestments, setUserInvestments] = useState([]);
  const [userAmount, setUserAmount] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://stalksound.store/sonification/user_info/",
        {
          headers: {
            accept: "application/json",
            "X-CSRFToken": "YOUR_CSRF_TOKEN", // Replace with your actual CSRF token
          },
        }
      );
      setUserInvestments(response.data["모의투자한 종목"]);
      setUserAmount(response.data["유저정보"]);
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    // Fetch initial data
    fetchUserData();

    // Fetch data every 5 seconds
    const intervalId = setInterval(fetchUserData, 5000);

    return () => {
      // Clear the interval when the component is unmounted
      clearInterval(intervalId);
    };
  }, []);
  const formatNumberWithCommas = (number) => {
    return number ? number.toLocaleString() : "";
  };

  function TextToSpeech(text){
    console.log(text);
    const value = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(value);
  }

  function TextToSpeechInvest(text) {
    console.log(text);
    text.map((investment) => {
      let t = `주식 : ${investment.stock}, 현재가 : ${investment.price}, 주식 등락률 : ${investment.rate_profit_loss}%`;
      const value = new SpeechSynthesisUtterance(t);
      window.speechSynthesis.speak(value);
      return null;
    });
  }
  
  const totalAssets = userAmount.user_property + userAmount.총자산;

  return (
    <>
      <AmountBox onDoubleClick={() => TextToSpeech(`자산 ${formatNumberWithCommas(userAmount.user_property)}원`)}>
      <Container>
        <AmountTextLeft1>총 자산</AmountTextLeft1>
        <AmountTextRight1>
          {formatNumberWithCommas(totalAssets)} 원
        </AmountTextRight1>
        </Container>

        <Container2>
        <AmountTextLeft>자산</AmountTextLeft>
        <AmountTextRight>
          {formatNumberWithCommas(userAmount.user_property)} 원
        </AmountTextRight>
        <AmountTextLeft>보유 주식</AmountTextLeft>
        <AmountTextRight>
          {formatNumberWithCommas(userAmount.총자산)} 원
        </AmountTextRight>
        </Container2>
        </AmountBox>

        <Separator />
      <InvestBox onDoubleClick={() => TextToSpeechInvest(userInvestments)}>
        {userInvestments.map((investment) => (
          <InvestContainer key={investment.id}>
            <InvestName>
            <Link
                        
              to={`/detail/${investment.is_domestic_stock.toString().toLowerCase() === "true" ? "" : "inter/"}${investment.stock_code}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              {investment.stock}
            </Link>

            </InvestName>
            <InvestPrice>
              {formatNumberWithCommas(investment.now_price)} 원
            </InvestPrice>
            <InvestRate value={investment.rate_profit_loss}>
              {investment.rate_profit_loss.toFixed(2)}%
            </InvestRate>
          </InvestContainer>
        ))}
      </InvestBox>
    </>
  );
};

export default MainMyInvest;