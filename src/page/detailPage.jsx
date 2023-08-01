import React, { useState } from "react";
import styled from "styled-components";

import TopBar from "../component/global/topBar";
import DetailGraph from "../component/detail/detailGraph";
import DetailStatic from "../component/detail/detailStatic";
import DetailInfo from "../component/detail/detailInfo";
import DetailNews from "../component/detail/detailNews";
import DetailButton from "../component/detail/detailButton";
import BottomBar from "../component/global/bottomBar";

const MiddleBar = styled.div`
  display: flex;
  width: 100vw;
  height: 8vh;
  justify-content: space-evenly;
`;

const StaticBtn = styled.button`
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

const InfoBtn = styled.button`
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

const DetailPage = () => {
  const [active, setActive] = useState("Static");

  return (
    <>
      <TopBar></TopBar>
      <DetailGraph styled="margin-top : 3rem"></DetailGraph>
      <MiddleBar>
        <StaticBtn
          isActive={active === "Static"}
          onClick={() => setActive("Static")}
        >
          통계
        </StaticBtn>

        <InfoBtn isActive={active === "Info"} onClick={() => setActive("Info")}>
          종목정보
        </InfoBtn>

        <NewsBtn isActive={active === "News"} onClick={() => setActive("News")}>
          뉴스
        </NewsBtn>
      </MiddleBar>

      {active === "Static" && <DetailStatic></DetailStatic>}
      {active === "Info" && <DetailInfo></DetailInfo>}
      {active === "News" && <DetailNews></DetailNews>}

      <BottomBar></BottomBar>
    </>
  );
};

export default DetailPage;
