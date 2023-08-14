import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailButton from "./detailButton";

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

const DetailStatic = () => {
  const { StockID1 } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("https://stalksound.store/sonification/now_data/", {
        params: {
          symbol: StockID1,
        },
      })
      .then(response => {
        setData(response.data.chart_data);
      })
      .catch(error => {
        console.error("에러에러에러", error);
      });
  }, []);

  const textColor = parseFloat(data["전일 대비율"]) > 0 ? "#FF0000" : "#0000FF";

  return (
    <>
      <StaticBox>
        <StaticInfoBox>
          <InfoTitle>시가</InfoTitle>
          <InfoText textColor="#FFB229">{data["시가"]}</InfoText>
        </StaticInfoBox>

        <StaticInfoBox>
          <InfoTitle>고가</InfoTitle>
          <InfoText textColor="#E685FF">{data["고가"]}</InfoText>
        </StaticInfoBox>

        <StaticInfoBox>
          <InfoTitle>저가</InfoTitle>
          <InfoText textColor="#6BBDFF">{data["저가"]}</InfoText>
        </StaticInfoBox>

        <StaticInfoBox>
          <InfoTitle>전일 대비율</InfoTitle>
          <InfoText textColor={textColor}>{data["전일 대비율"]}%</InfoText>
        </StaticInfoBox>

        <StaticInfoBox>
          <InfoTitle>누적 거래량</InfoTitle>
          <InfoText>{data["누적 거래량"]}</InfoText>
        </StaticInfoBox>

        <StaticInfoBox>
          <InfoTitle>시가 총액</InfoTitle>
          <InfoText>{data["HTS 시가총액"]}</InfoText>
        </StaticInfoBox>
      </StaticBox>
      <DetailButton StockID={StockID1}></DetailButton>
    </>
  );
};

export default DetailStatic;
