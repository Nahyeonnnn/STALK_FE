import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import InterButton from "./interButton";

const StaticBox = styled.div`
  display: flex;
  width: 80vw;
  height: 20vh;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: white;
  border-radius: 0.625rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3vh;
  margin-bottom: 4vh;
`;

const StaticInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33%;
  height: 40%;
`;

const InfoTitle = styled.div`
  color: ${({ textColor }) => textColor || "#8198A5"};
  margin-bottom: 5px;
`;

const InfoText = styled.div`
  color: ${({ textColor }) => textColor || "#111111"};
`;

const InterStatic = () => {
  const { StockID4 } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const symbolUpperCase = StockID4.toUpperCase(); // Convert symbol to uppercase
    axios
      .get("https://stalksound.store/sonification/f_now_data/", {
        params: {
          symbol: symbolUpperCase, // Use the uppercase symbol for API call
        },
      })
      .then((response) => {
        setData(response.data.chart_data);
      })
      .catch((error) => {
        console.error("에러에러에러", error);
      });
  }, [StockID4]);

  const textColor =
    parseFloat(data && data["등락율"]) > 0 ? "#FF0000" : "#0000FF";

  function TextToSpeech(text) {
    console.log(text);
    const t = `시가 : ${text["시가"]}$,
     고가 : ${text["고가"]}$,
     저가 : ${text["저가"]}$,
     전일 대비율 : ${data["등락율"]}%, 
     누적 거래량 : ${data["거래량"]}, 
     시가총액 : ${text["시가총액"]}`;
    const value = new SpeechSynthesisUtterance(t);
    window.speechSynthesis.speak(value);
  }

  return (
    <>
      <StaticBox onDoubleClick={() => TextToSpeech(data)}>
        <StaticInfoBox>
          <InfoTitle>시가</InfoTitle>
          <InfoText textColor="#FFB229">{data && data["시가"]}</InfoText>
        </StaticInfoBox>

        <StaticInfoBox>
          <InfoTitle>고가</InfoTitle>
          <InfoText textColor="#E685FF">{data && data["고가"]}</InfoText>
        </StaticInfoBox>

        <StaticInfoBox>
          <InfoTitle>저가</InfoTitle>
          <InfoText textColor="#6BBDFF">{data && data["저가"]}</InfoText>
        </StaticInfoBox>

        <StaticInfoBox>
          <InfoTitle>전일 대비율</InfoTitle>
          <InfoText textColor={textColor}>{data && data["등락율"]}%</InfoText>
        </StaticInfoBox>

        <StaticInfoBox>
          <InfoTitle>누적 거래량</InfoTitle>
          <InfoText>
            {data && parseInt(data["거래량"]).toLocaleString()}
          </InfoText>
        </StaticInfoBox>

        <StaticInfoBox>
          <InfoTitle>시가 총액</InfoTitle>
          <InfoText>
            {data && parseInt(data["시가총액"]).toLocaleString()}원
          </InfoText>
        </StaticInfoBox>
      </StaticBox>
      <InterButton StockID={StockID4}></InterButton>
    </>
  );
};

export default InterStatic;
