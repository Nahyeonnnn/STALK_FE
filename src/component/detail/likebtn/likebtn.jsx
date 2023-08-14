import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Star from "./star-line.png";
import StarFilled from "./star-fill.png";

const LikeBtnBox = styled.div`
  position: absolute;
  display: flex;
  top: 13vh;
  right: 15vw;
  cursor: pointer;
  z-index: 500;
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

  const toggleLike = () => {
    setLiked(!liked);
    setAnimate(true);

    // 애니메이션 재생이 끝나면 다시 false로 설정하여 준비상태로 만듦
    setTimeout(() => {
      setAnimate(false);
    }, 500);
  };

  return (
    <>
      <LikeBtnBox onClick={toggleLike}>
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
