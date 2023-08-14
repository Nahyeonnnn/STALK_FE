import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BottomBar from "../component/global/bottomBar";
import TopBar from "../component/global/topBar";
import MyInform from "../component/myinfo/myInform";
import MyAsset from "../component/myinfo/myAsset";
import MainMyInvest from "../component/main/mainMyInvest";
import axios from "axios";

const MyInfoPage = () => {
  const [userName, setUserName] = useState([]);
  const [userProperty, setUserProperty] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://stalksound.store/sonification/user_info/"
        );
        setUserName(response.data.유저정보.username);
        setUserProperty(response.data.유저정보.user_property);
        // console.log(response.data);
        console.log(userName, userProperty);
      } catch (error) {
        console.error("userinfo 가져오기 실패 ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <TopBar></TopBar>
      <MyInform userName={userName}></MyInform>
      <MyAsset userProperty={userProperty}></MyAsset>
      <MainMyInvest></MainMyInvest>
      <BottomBar></BottomBar>
    </>
  );
};

export default MyInfoPage;
