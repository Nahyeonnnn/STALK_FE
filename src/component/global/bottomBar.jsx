import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faNewspaper,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome, faNewspaper, faUserTie);

const BottomBarBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6vh;
  width: 100vw;
  box-shadow: 0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.2);
  border-radius: 0.625rem 0.625rem 0rem 0rem;
  z-index: 100;
`;
const BottomBarNewsBtn = styled.div``;

const BottomBarMyInfoBtn = styled.div``;

const BottomBarMainBtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  background-color: #3e497a;
  box-shadow: 0.0625rem 0.0625rem 0.0625rem rgb(0, 0, 0, 0.2);
  margin-bottom: 0.625rem;
`;

const BottomBar = () => {
  const navigate = useNavigate();

  function moveToMain() {
    // mainPage로 이동하는 함수
    navigate(`/main`);
  }

  function moveToNews() {
    // newsPage로 이동하도록 바꿔야함!
    navigate(`/news`);
  }

  function moveToMyInfo() {
    // myPage로 이동하는 함수
    navigate(`/myInfo`);
  }

  return (
    <>
      <BottomBarBox>
        <BottomBarNewsBtn onClick={moveToNews}>
          <FontAwesomeIcon icon={faNewspaper} style={{ color: "#3E497A" }} />
        </BottomBarNewsBtn>

        <BottomBarMainBtnBox>
          <div onClick={moveToMain}>
            <FontAwesomeIcon icon={faHome} style={{ color: "white" }} />
          </div>
        </BottomBarMainBtnBox>

        <BottomBarMyInfoBtn onClick={moveToMyInfo}>
          <FontAwesomeIcon icon={faUserTie} style={{ color: "#3E497A" }} />
        </BottomBarMyInfoBtn>
      </BottomBarBox>
    </>
  );
};

export default BottomBar;
