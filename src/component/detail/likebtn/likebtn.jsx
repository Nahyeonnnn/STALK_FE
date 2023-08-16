import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import Star from "./star-line.png";
import StarFilled from "./star-fill.png";
import axios from "axios";
import { useParams } from "react-router-dom";

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
  const [liked, setLiked] = useState();
  const [animate, setAnimate] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const {StockID1} = useParams();
  const {StockID4} = useParams();

  const StockID = (StockID1 === undefined) ? StockID4 : StockID1;

  useEffect(()=>{ //찜한 주식인지 확인 후 setLiked 호출
    //checkislike
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://stalksound.store/sonification/checkislike/`,{
          params : {"stock_name" : `${StockID}`}
        })
        if (response.data.message){
          setLiked(true);
        }
        else {//찜하지 않은 주식일 경우
          setLiked(false);
        }
        console.log(response.data);
      }
      catch (error) {
        console.log("liked 여부 가져오기 실패", error)
      }
    }

    fetchData();
  },[]);

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

  const fetchData = async () => {
    try {
      const response = await axios.post(`https://stalksound.store/sonification/like_stock/`, {
        "symbol" : `${StockID}`
      });
      console.log(response.data);
      alert(response.data.message);
    }
    catch (error) {
      console.log("찜하기 실패", error);
    }
  };

  return (
    <>
      <LikeBtnBox lessThan400={lessThan400} onClick={() => {toggleLike(); fetchData();}}>
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