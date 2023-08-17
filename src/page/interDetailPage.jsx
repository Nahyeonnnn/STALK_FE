import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import TopBar from "../component/global/topBar";
import InterGraph from "../component/detail/interGraph";
import InterStatic from "../component/detail/interStatic";
import InterInfo from "../component/detail/interInfo";
import InterNews from "../component/detail/interNews";
import BottomBar from "../component/global/bottomBar";

const MiddleBar = styled.div`
  display: flex;
  width: 100vw;
  height: 8vh;
  justify-content: space-evenly;
  background-color: ${({ isSticky }) =>
    isSticky ? "#21325e" : "rgba(255, 255, 255, 0.1)"};
  position: sticky;
  top: 3rem;
  transition: background-color 0.3s ease;
`;

const Button = styled.button`
  width: 25vw;
  height: 8vh;
  cursor: pointer;
  background: transparent;
  color: ${({ isActive }) => (isActive ? "rgba(241, 208, 10, 0.92)" : "white")};
  border: none;
  border-bottom: ${({ isActive }) =>
    isActive ? "3px solid rgba(241, 208, 10, 0.92)" : "none"};
  font-size: 1rem;
  font-weight: bold;
`;

const InterDetailPage = () => {
  const { StockID4 } = useParams();
  const [active, setActive] = useState("Static");
  const [isMiddleBarSticky, setMiddleBarSticky] = useState(false);

  useEffect(() => {
    // Function to check if MiddleBar is sticky and update isMiddleBarSticky state
    const handleScroll = () => {
      const middleBarOffset = 3 * 16; // Convert 3rem to pixels (assuming 1rem = 16px)
      const isSticky = window.scrollY >= middleBarOffset;
      setMiddleBarSticky(isSticky);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <TopBar></TopBar>
      <InterGraph styled="margin-top : 3rem"></InterGraph>
      <MiddleBar isSticky={isMiddleBarSticky}>
        <Button isActive={active === "Static"} onClick={() => setActive("Static")}>
          통계
        </Button>
        <Button isActive={active === "News"} onClick={() => setActive("News")}>
          뉴스
        </Button>
      </MiddleBar>
      {active === "Static" && <InterStatic></InterStatic>}
      {active === "News" && <InterNews stockID={StockID4} />}
      <BottomBar></BottomBar>
    </>
  );
};

export default InterDetailPage;
