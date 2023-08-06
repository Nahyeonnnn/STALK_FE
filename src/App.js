import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/loginPage";
import MainPage from "./page/mainPage";
import DetailPage from "./page/detailPage";
import SearchPage from "./page/searchPage";
import BuyPage from "./page/buyPage";
import BuyConfirmPage from "./page/buyConfirmPage";
import SellPage from "./page/sellPage";
import MyInfoPage from "./page/myInfoPage";
import NewsPage from "./page/newsPage";
import NewsdetailPage from "./page/newsdetailPage";
import NotFoundPage from "./page/notFoundPage";
import CallbackPage from "./page/CallbackPage";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    height : 100%;
    margin: 0;
    padding : 0;
  }
`;

const StyledApp = styled.div`
  background-color: #21325e;
  min-height: 100vh;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/detail/:StockID" element={<DetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/buy/confirm" element={<BuyConfirmPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/myInfo" element={<MyInfoPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/newsdetail" element={<NewsdetailPage />} />
            <Route exact path="/kakao/callback" element={<CallbackPage/>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </StyledApp>
    </>
  );
}

export default App;
