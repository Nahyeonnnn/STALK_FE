import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Samsung from "./graphlist/samsung";

const ChartBox = styled.div`
  display: flex;
  width: 20rem;
  height: 15rem;
  background-color: rgba(241, 208, 10, 0.92);
  border-radius: 1rem;
  margin: auto;
  position: relative;
`;

const ChartType = styled.p`
  color: white;
  font-size: small;
  margin-left: 1rem;
  font-weight: bold;
`;

const ChartButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

const ChartButton = styled.button`
  background-color: ${({ isActive }) =>
    isActive ? "rgba(241, 208, 10, 0.92)" : "lightgray"};
  width: 5px;
  height: 12px;
  border-radius: 50%;
  border-style: none;
  margin: 10px 5px;
  cursor: pointer;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

const LeftArrow = styled(ArrowButton)`
  left: 0;
`;

const RightArrow = styled(ArrowButton)`
  right: 0;
`;

const MainGraph = () => {
  const [activeButton, setActiveButton] = useState(1);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveButton((prevButton) => (prevButton % 6) + 1);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleNextChart = () => {
    setActiveButton((prevButton) => (prevButton % 6) + 1);
  };

  const handlePreviousChart = () => {
    setActiveButton((prevButton) => (prevButton - 2 + 6) % 6 + 1);
  };

  const renderInfo = () => {
    switch (activeButton) {
      case 1:
        return (
          <>
            <Samsung />
          </>
        );
      case 2:
        return "코스닥 정보";
      case 3:
        return "환율 정보";
      case 4:
        return "나스닥 정보";
      case 5:
        return "다우존스 정보";
      case 6:
        return "S&P500 정보";
      default:
        return "코스피 정보";
    }
  };

  return (
    <>
      <ChartBox>
        <LeftArrow onClick={handlePreviousChart}>&#8249;</LeftArrow>
        <RightArrow onClick={handleNextChart}>&#8250;</RightArrow>
        <ChartType>{renderInfo()}</ChartType>
      </ChartBox>
      <ChartButtonBox>
        <ChartButton
          isActive={activeButton === 1}
          onClick={() => setActiveButton(1)}
        ></ChartButton>
        <ChartButton
          isActive={activeButton === 2}
          onClick={() => setActiveButton(2)}
        ></ChartButton>
        <ChartButton
          isActive={activeButton === 3}
          onClick={() => setActiveButton(3)}
        ></ChartButton>
        <ChartButton
          isActive={activeButton === 4}
          onClick={() => setActiveButton(4)}
        ></ChartButton>
        <ChartButton
          isActive={activeButton === 5}
          onClick={() => setActiveButton(5)}
        ></ChartButton>
        <ChartButton
          isActive={activeButton === 6}
          onClick={() => setActiveButton(6)}
        ></ChartButton>
      </ChartButtonBox>
    </>
  );
};

export default MainGraph;
