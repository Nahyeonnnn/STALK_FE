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
  width: 40vw;
`;

const InvestPrice = styled.div`
  width: 30vw;
  display: flex;
  justify-content: flex-end;
  margin-left: 2rem;
`;

const InvestRate = styled.div`
  width: 10vw;
  display: flex;
  justify-content: flex-end;
  color: ${({ value }) => (String(value).startsWith("-") ? "skyblue" : "red")};
`;

const formatNumberWithCommas = (number) => {
  return number.toLocaleString();
};

const MainMyInvest = () => {
  const [userInvestments, setUserInvestments] = useState([]);
  const [userAmount, setUserAmount] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchUserData();
  }, []);

  const formatNumberWithCommas = (number) => {
    return number ? number.toLocaleString() : "";
  };

  return (
    <>
      <AmountBox>
        <AmountTextLeft>총 자산</AmountTextLeft>
        <AmountTextRight>
          {formatNumberWithCommas(userAmount.user_property)} 원
        </AmountTextRight>
      </AmountBox>
      <InvestBox>
        {userInvestments.map((investment) => (
          <InvestContainer key={investment.id}>
            <InvestName>{investment.stock}</InvestName>
            <InvestPrice>
              {formatNumberWithCommas(investment.now_price)} 원
            </InvestPrice>
            <InvestRate value={investment.rate_profit_loss}>
              {investment.rate_profit_loss}
            </InvestRate>
          </InvestContainer>
        ))}
      </InvestBox>
    </>
  );
};

export default MainMyInvest;