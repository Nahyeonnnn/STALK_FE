import React, { useState,useEffect } from "react";
import styled from "styled-components";

import MainInfo from "../component/main/mainInfo";
import MainGraph from "../component/main/mainGraph";
import MainMyInvest from "../component/main/mainMyInvest";
import MainNews from "../component/main/mainNews";
import MainRank from "../component/main/mainRank";
import BottomBar from "../component/global/bottomBar";
import TopBar from "../component/global/topBar";

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

const InvestBtn = styled.button`
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

const RankBtn = styled.button`
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

const NewsBtn = styled.button`
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

const MainPage = () => {
  const [active, setActive] = useState("Invest");
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
      <TopBar />
      <MainInfo />
      <MainGraph />
      <MiddleBar isSticky={isMiddleBarSticky}>
        <InvestBtn
          isActive={active === "Invest"}
          onClick={() => setActive("Invest")}
        >
          투자
        </InvestBtn>
        <RankBtn
          isActive={active === "Rank"}
          onClick={() => setActive("Rank")}
        >
          오늘의 발견
        </RankBtn>
        <NewsBtn
          isActive={active === "News"}
          onClick={() => setActive("News")}
        >
          뉴스
        </NewsBtn>
      </MiddleBar>
      {active === "Invest" && <MainMyInvest />}
      {active === "Rank" && <MainRank />}
      {active === "News" && <MainNews />}
      <BottomBar />
    </>
  );
};

export default MainPage;