import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Kospi from "./graphlist/kospi";
import Kosdaq from "./graphlist/kosdaq";
import Nasdaq from "./graphlist/nasdaq";
import Spx from "./graphlist/spx";

const ChartBox = styled.div`
  display: flex;
  width: 85vw;
  /* height: 33vh; */
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
      setActiveButton((prevButton) => (prevButton % 4) + 1);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleNextChart = () => {
    setActiveButton((prevButton) => (prevButton % 4) + 1);
  };

  const handlePreviousChart = () => {
    setActiveButton((prevButton) => ((prevButton - 2 + 4) % 4) + 1);
  };

  const renderInfo = () => {
    switch (activeButton) {
      case 1:
        return (
          <>
            <Kospi />
          </>
        );
      case 2:
        return (
          <>
            <Kosdaq />
          </>
        );
      case 3:
        return (
          <>
            <Spx />
          </>
        );
      case 4:
        return (
          <>
            <Nasdaq />
          </>
        );
      default:
        return (
          <>
            <Kospi />
          </>
        );
    }
  };

  return (
    <>
      <ChartBox>
        <LeftArrow onClick={handlePreviousChart}>&#8249;</LeftArrow>
        <RightArrow onClick={handleNextChart}>&#8250;</RightArrow>
        {/* <ChartType> 코스피</ChartType> */}
        {renderInfo()}
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
      </ChartButtonBox>
    </>
  );
};

export default MainGraph;
