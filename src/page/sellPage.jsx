import React, { useState } from "react";
import styled from "styled-components";
import BottomBar from "../component/global/bottomBar";
import TopBar from "../component/global/topBar";

const StockName = styled.div`
  display: flex;
  color: white;
  font-weight: bold;
  width: 90vw;
  height: 13vh;
  margin: auto;
  align-items: flex-end;
  font-size: larger;
`;

const PriceBox = styled.div`
  display: flex;
  color: white;
  margin-top: 1.5rem;
  justify-content: space-around;
`;

const PriceBoxLeft = styled.div`
  color: lightgray;
`;

const PriceBoxRight = styled.div`
  color: white;
`;

const PurchastText = styled.div`
  color: white;
  margin-top: 3rem;
  margin-left: 2rem;
  font-weight: bold;
`;

const FormContainer = styled.div`
  display: flex;
  width: 70vw;
  margin: auto;
  margin-top: 1.5rem;
  background-color: #f1d00a;
  border-radius: 2rem;
  opacity: 0.85;
  height: auto;
`;

const PurchaseBox = styled.input`
  display: flex;
  background-color: #f1d00a;
  opacity: 0.85;
  border-radius: 2rem;
  width: 45vw;
  height: 4vh;
  margin: auto;
  padding: 1rem 0 1rem 1rem;
  border-style: none;
  color: rgb(255, 255, 255);
  &:focus {
    outline: none;
  }
  font-size: 1.5rem;
`;

const PurchaseConfirm = styled.button`
  color: black;
  font-weight: bold;
  align-self: center;
  border: none;
  background: none;
  padding: 0.5rem;
  width: 5rem;
  white-space: nowrap;
  font-size: 1rem;
`;

const NumberBox = styled.div`
  background-color: #f1d00a;
  width: 100vw;
  height: 40vh;
  display: flex;
  position: fixed;
  bottom: 2rem;
  margin: auto;
  border-radius: 1rem;
  justify-content: space-around;
  flex-direction: column;
`;
const ThreeNumberBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding:1rem;
`;

const LastNumberBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const NumberEach = styled.button`
  font-size: 2rem;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0);
  border: 0rem;
`;

const TextEach = styled.button`
  font-size: 1rem;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0);
  border: 0rem;
  margin-left: -1rem;
  margin-right: -1rem;
`;

const SellPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [active, setActive] = useState(0);
  const [inputLength, setInputLength] = useState(0); // State to keep track of input length

  // This function adds the passed digit to the current input
  const addDigit = (digit) => {
    setInputValue((prevValue) => prevValue + digit);
    setInputLength((prevLength) => prevLength + 1);
  };

  const removeDigit = () => {
    setInputValue((prevValue) => prevValue.slice(0, -1));
    setInputLength((prevLength) => prevLength - 1);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <TopBar></TopBar>
      <StockName>삼성전자</StockName>
      <PriceBox>
        <PriceBoxLeft>판매할 가격</PriceBoxLeft>
        <PriceBoxRight>70,500원</PriceBoxRight>
      </PriceBox>
      <PurchastText>몇 주를 판매할까요?</PurchastText>
      <FormContainer>
        <PurchaseBox
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => setActive(1)}
        ></PurchaseBox>
        <PurchaseConfirm onClick={() => setActive(0)}>확인</PurchaseConfirm>
      </FormContainer>
      {active === 1 && (
        <NumberBox>
          <ThreeNumberBox>
            <NumberEach onClick={() => addDigit(1)}>1</NumberEach>
            <NumberEach onClick={() => addDigit(2)}>2</NumberEach>
            <NumberEach onClick={() => addDigit(3)}>3</NumberEach>
          </ThreeNumberBox>
          <ThreeNumberBox>
            <NumberEach onClick={() => addDigit(4)}>4</NumberEach>
            <NumberEach onClick={() => addDigit(5)}>5</NumberEach>
            <NumberEach onClick={() => addDigit(6)}>6</NumberEach>
          </ThreeNumberBox>
          <ThreeNumberBox>
            <NumberEach onClick={() => addDigit(7)}>7</NumberEach>
            <NumberEach onClick={() => addDigit(8)}>8</NumberEach>
            <NumberEach onClick={() => addDigit(9)}>9</NumberEach>
          </ThreeNumberBox>
          <LastNumberBox>
            <TextEach onClick={() => setInputValue("")}>전체삭제</TextEach>
            <NumberEach onClick={() => addDigit(0)}>0</NumberEach>
            <NumberEach onClick={() => removeDigit()}>⬅</NumberEach>
          </LastNumberBox>
        </NumberBox>
      )}

      <BottomBar></BottomBar>
    </>
  );
};

export default SellPage;
