import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/loginPage";
import MainPage from "./page/mainPage";
import DetailPage from "./page/detailPage";
import SearchPage from "./page/searchPage";
import BuyPage from "./page/buyPage";
import BuyConfirmPage from "./page/buyConfirmPage";
import SellPage from "./page/sellPage";
import SellConfirmPage from "./page/sellConfirmPage";
import MyInfoPage from "./page/myInfoPage";
import NewsPage from "./page/newsPage";
import NewsdetailPage from "./page/newsdetailPage";
import NotFoundPage from "./page/notFoundPage";
import CallbackPage from "./page/CallbackPage";
import InterDetailPage from "./page/interDetailPage";
import InterBuyPage from "./page/interBuyPage";
import InterSellPage from "./page/interSellPage";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    height : 100%;
    margin: 0;
    padding : 0;
    ${"" /* ${"" /* font-family: 'Inter'; */} */}
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
            <Route path="/detail/:StockID1" element={<DetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/buy/:StockID2" element={<BuyPage />} />
            <Route path="/buy/confirm" element={<BuyConfirmPage />} />
            <Route path="/sell/:StockID3" element={<SellPage />} />
            <Route path="/sell/confirm" element={<SellConfirmPage />} />
            <Route path="/myInfo" element={<MyInfoPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/newsdetail/:ArticleID" element={<NewsdetailPage />} />
            <Route exact path="/kakao/callback" element={<CallbackPage />} />
            <Route
              path="/detail/inter/:StockID4"
              element={<InterDetailPage />}
            />
            <Route path="/buy/inter/:StockID5" element={<InterBuyPage />} />
            <Route path="/sell/inter/:StockID6" element={<InterSellPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </StyledApp>
    </>
  );
}

export default App;
