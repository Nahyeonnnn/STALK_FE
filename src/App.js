import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = checkLoginStatus(); // 쿠키에서 로그인 상태 확인

  return (
    <Route
      {...rest}
      element={isLoggedIn ? children : <Navigate to="/login" />}
    />
  );
}

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
            <PrivateRoute path="/buy/:StockID2" element={<BuyPage />} />
            <Route path="/buy/confirm" element={<BuyConfirmPage />} />
            <Route path="/sell/:StockID3" element={<SellPage />} />
            <Route path="/sell/confirm" element={<SellConfirmPage />} />
            <Route path="/myInfo" element={<MyInfoPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/newsdetail/:ArticleID" element={<NewsdetailPage />} />
            <Route exact path="/kakao/callback" element={<CallbackPage/>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </StyledApp>
    </>
  );
}

// 실제 쿠키에서 로그인 상태 정보를 확인하는 함수
function checkLoginStatus() {
  // 쿠키에서 'isLoggedIn' 값을 찾아 로그인 상태를 확인하는 로직
  const cookies = document.cookie.split("; ");
  const isLoggedInCookie = cookies.find((cookie) => cookie.startsWith("isLoggedIn="));

  if (isLoggedInCookie) {
    const isLoggedInValue = isLoggedInCookie.split("=")[1];
    return isLoggedInValue === "true"; // 예시: "true"면 로그인 상태
  }

  return false; // 쿠키에 isLoggedIn이 없으면 로그아웃 상태
}



export default App;
