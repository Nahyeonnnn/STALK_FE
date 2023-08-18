import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

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
  width: 40vw;
`;

const InvestPrice = styled.div`
  width: 40vw;
  display: flex;
  justify-content: flex-end;
  transition: color 0.5s;
`;

const InvestRate = styled.div`
  width: 5vw;
  display: flex;
  justify-content: flex-end;
  color: ${({ value }) => (String(value).startsWith("-") ? "skyblue" : "red")};
  margin-left: 4rem;
  transition: color 0.5s;
`;

const MainMyInvest = () => {
  const [userInvestments, setUserInvestments] = useState([]);
  const [userAmount, setUserAmount] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://stalksound.store/sonification/user_info/",
          {
            headers: {
              accept: "application/json",
              "X-CSRFToken": "PtBcd9eicnJntlwEKP51K7Q4AuZtv7Zvs4VqgjLN0gACI6ZKfs2W7IPaM60dyHZP", // Replace with your actual CSRF token
            },
          }
        );
        setUserInvestments(response.data["모의투자한 종목"]);
        setUserAmount(response.data["유저정보"]);
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
      }
    };

    const fetchDataPeriodically = async () => {
      const updatedInvestments = await Promise.all(
        userInvestments.map(async (investment) => {
          const apiUrl = investment.is_domestic_stock
            ? `https://stalksound.store/sonification/now_data/?symbol=${investment.stock_code}`
            : `https://stalksound.store/sonification/f_now_data/?symbol=${investment.stock_code}`;
    
          try {
            const response = await axios.get(apiUrl, {
              headers: {
                accept: "application/json",
                "X-CSRFToken": "PtBcd9eicnJntlwEKP51K7Q4AuZtv7Zvs4VqgjLN0gACI6ZKfs2W7IPaM60dyHZP", // Replace with your actual CSRF token
              },
            });
    
            // Create a new investment object with updated now_price
            const updatedInvestment = {
              ...investment,
              now_price: response.data.현재가,
            };
    
            return updatedInvestment;
          } catch (error) {
            console.error(`주식 정보 가져오기 실패 (${investment.stock}):`, error);
            return investment; // Return the original investment if fetching fails
          }
        })
      );
    
      setUserInvestments(updatedInvestments);
    };

    // Fetch initial data and start periodic data fetching
    fetchUserData();
    fetchDataPeriodically();

    const intervalId = setInterval(fetchDataPeriodically, 30000); // 30초에 한 번씩 데이터 갱신

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [userInvestments]);

  const formatNumberWithCommas = (number) => {
    return number ? number.toLocaleString() : "";
  };

  function TextToSpeech(text) {
    console.log(text);
    const value = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(value);
  }

  function TextToSpeechInvest(text) {
    console.log(text);
    text.map((investment) => {
      let t = `주식 : ${investment.stock}, 현재가 : ${investment.now_price}, 주식 등락률 : ${investment.rate_profit_loss.toFixed(2)}%`;
      const value = new SpeechSynthesisUtterance(t);
      window.speechSynthesis.speak(value);
      return null;
    });
  }

  return (
    <>
      <AmountBox onDoubleClick={() => TextToSpeech(`총 자산 ${formatNumberWithCommas(userAmount.user_property)}원`)}>
        <AmountTextLeft>총 자산</AmountTextLeft>
        <AmountTextRight>
          {formatNumberWithCommas(userAmount.user_property)} 원
        </AmountTextRight>
      </AmountBox>
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