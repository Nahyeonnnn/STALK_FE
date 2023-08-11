import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const BtnBox = styled.div`
  display: flex;
  height: 3.125rem;
  width: 10rem;
  background-color: ${(props) => props.color || "gray"};
  color: ${(props) => props.textColor || "black"};
  border-radius: 0.625rem;
  justify-content: center;
  align-items: center;
`;

<<<<<<< HEAD

const DetailButton = () => {
=======
const DetailButton = (props) => {
>>>>>>> 94bdde91521fd595b785ad1c63a572af0efc97ba
  const navigate = useNavigate();

  function moveToBuy() {
    navigate(`/buy/${props.StockID}`);
  }

  function moveToSell() {
    navigate(`/sell/${props.StockID}`);
  }

  return (
    <>
      <BtnContainer>
        <BtnBox onClick={moveToSell} color="#B6B6B6" textColor="#2B50F6">
          판매하기
        </BtnBox>
        <BtnBox onClick={moveToBuy} color="#2B50F6" textColor="#FFFFFF">
          구매하기
        </BtnBox>
      </BtnContainer>
    </>
  );
};

export default DetailButton;
