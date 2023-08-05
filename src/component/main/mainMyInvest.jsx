import React from "react";
import styled from "styled-components";

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
  color: ${props => (props.value.startsWith("-") ? "skyblue" : "red")};
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
  color: ${props => (props.value.startsWith("-") ? "skyblue" : "red")};
`;

const MainMyInvest = () => {
  return (
    <>
      <AmountBox>
        <AmountTextLeft>총 자산</AmountTextLeft>
        <AmountTextRight>
          93,214,620원 <AmountTextRightRate value="+ 15.2%"> (+ 15.2%)</AmountTextRightRate>
        </AmountTextRight>
      </AmountBox>
      <InvestBox>
        <Invest_1>
          <Invest_1_name>AT&T Inc.</Invest_1_name>
          <Invest_1_price>32,445 $</Invest_1_price>
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
