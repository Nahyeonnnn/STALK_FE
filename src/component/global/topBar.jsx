import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stalklogo from "./StalkLogo";

import {
  faArrowLeft,
  faGear,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

library.add(faArrowLeft, faMagnifyingGlass, faGear);

const TopBarBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #21325e;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 7vh;
  width: 100vw;
  z-index: 2;
`;

const TopBarBackBtn = styled.div`
  font-size: 1.5rem;
  position: absolute; /* 아이콘 위치를 고정 */
  left: 1.5rem;
`;

const TopBarSearchBtn = styled.div`
  font-size: 1.5rem;
  position: absolute; /* 아이콘 위치를 고정 */
  right: 1rem;
`;

const TopBarTitleBox = styled.div`
  position: absolute; /* STALK 텍스트의 위치를 고정 */
  left: 50%; /* 가운데로 정렬 */
  transform: translateX(-50%); /* 가운데로 정렬 */
  /* margin-left : 8rem;
    margin-right : 5.5rem; */
  font-size: 20px;
  font-weight: 800;
  color: #f1d00a;
`;

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isMainPage = location.pathname === "/main";
  const isNewsPage = location.pathname === "/news";
  const istradePage = location.pathname === "/trade";

  function moveToBack() {
    // 뒤로 이동하는 함수
    navigate(-1);
  }

  function moveToSearch() {
    // searchPage로 이동하는 함수
    navigate(`/search`);
  }

  function moveToSetting() {
    // Setting로 이동하도록 변경해야함
    navigate(`/myInfo`);
  }

  function moveToMain() {
    const data = {
      someKey: "someValue",
      anotherKey: "anotherValue"
    };
    navigate(`/main`, {state : data});
  }

  return (
    <>
      <TopBarBox>
        <TopBarBackBtn onClick={moveToBack}>
          {!isMainPage && (
            <FontAwesomeIcon icon={faArrowLeft} style={{ color: "F1D00A" }} />
          )}
        </TopBarBackBtn>

        <TopBarTitleBox onClick={moveToMain}>STALK</TopBarTitleBox>

        <TopBarSearchBtn onClick={moveToSearch}>
          {!isNewsPage && !istradePage && (
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "F1D00A" }}
            />
          )}
        </TopBarSearchBtn>
      </TopBarBox>
    </>
  );
};

export default TopBar;
