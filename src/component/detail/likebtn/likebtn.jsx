import React, { useState } from "react";
import styled from "styled-components";

const LikeBtnBox = styled.div`
  position: absolute;
  display: flex;
  top: 10vh;
  left: 8vw;
  cursor: pointer; /* 포인터 커서 표시 */
`;

const HeartIcon = styled.span`
  /* font-size: 15px; */
  color: ${(props) =>
    props.liked ? "red" : "black"}; /* 클릭 여부에 따라 색상 변경 */
`;

const Likebtn = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <>
      <LikeBtnBox onClick={toggleLike}>
        <HeartIcon liked={liked}>{liked ? "❤" : "♡"}</HeartIcon>
      </LikeBtnBox>
    </>
  );
};

export default Likebtn;
