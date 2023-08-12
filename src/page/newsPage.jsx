import React, { useState } from "react";
import styled from "styled-components";

import BottomBar from "../component/global/bottomBar";
import TopBar from "../component/global/topBar";
import MainNews from "../component/main/mainNews";
const Container = styled.div`
  display: flex;
  padding: 1rem;
  margin-left: 1rem;
  margin-top: 3rem;
`;

const News = styled.div`
  color: #fff;
  font-family: Inter;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  z-index: 0;
`;

const NewsPage = () => {
  return (
    <>
      <TopBar></TopBar>
      <Container>
        <News>뉴스</News>
      </Container>
      <MainNews></MainNews>
      <BottomBar></BottomBar>
    </>
  );
};

export default NewsPage;
