import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const LikeBtnBox = styled.div`
  position: absolute;
  display: flex;
  top: 11vh;
  right: 15vw;
  cursor: pointer;
  z-index: 500;
`;

const HeartIcon = styled.span`
  /* font-size: 15px; */
  color: ${(props) => (props.liked ? "red" : "black")};
  transition: font-size 0.3s;
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

const AnimatedHeartIcon = styled(HeartIcon)`
  animation: ${(props) => (props.animate ? heartbeatAnimation : "none")} 0.5s
    ease-in-out;
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
        <AnimatedHeartIcon liked={liked} animate={animate}>
          {liked ? "❤" : "♡"}
        </AnimatedHeartIcon>
      </LikeBtnBox>
    </>
  );
};

export default Likebtn;
