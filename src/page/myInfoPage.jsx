import React, { useState } from "react";
import styled from "styled-components";
import BottomBar from "../component/global/bottomBar";
import TopBar from "../component/global/topBar";
import MyInform from "../component/myinfo/myInform";
import MyAsset from "../component/myinfo/myAsset";
import MainMyInvest from "../component/main/mainMyInvest";

const MyInfoPage = () => {
  return (
    <>
      <TopBar></TopBar>
      <MyInform></MyInform>
      <MyAsset></MyAsset>
      <MainMyInvest></MainMyInvest>
      <BottomBar></BottomBar>
    </>
  );
};

export default MyInfoPage;
