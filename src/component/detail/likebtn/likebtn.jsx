import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import Star from "./star-line.png";
import StarFilled from "./star-fill.png";

const LikeBtnBox = styled.div`
  position: absolute;
  display: flex;
  top: ${(props) => (props.lessThan400 ? "9vh" : "11vh")};
  right: 15vw;
  cursor: pointer;
  z-index: 500;

  /* 미디어 쿼리 추가 */
  ${(props) =>
    props.lessThan400 &&
    css`
      top: 10vh; /* 원하는 위치로 조정 */
    `}
`;

const heartbeatAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const AnimatedStarIcon = styled.img`
  animation: ${(props) => (props.animate ? heartbeatAnimation : "none")} 0.5s
    ease-in-out;

  /* 이미지 오른쪽으로 1px 이동 */
  position: relative;
  left: ${(props) => (props.liked ? "3.7px" : "0")};
`;

const Likebtn = () => {
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    // resize 이벤트 리스너 추가
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleLike = () => {
    setLiked(!liked);
    setAnimate(true);

    setTimeout(() => {
      setAnimate(false);
    }, 500);
  };

  const lessThan400 = viewportWidth < 400;

  return (
    <>
      <LikeBtnBox lessThan400={lessThan400} onClick={toggleLike}>
        <AnimatedStarIcon
          src={liked ? StarFilled : Star}
          alt=""
          animate={animate}
          liked={liked}
        />
      </LikeBtnBox>
    </>
  );
};

export default Likebtn;
