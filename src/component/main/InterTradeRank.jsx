import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 90vw;
  margin: auto;
`;

const Box = styled.div`
  width: 90vw;
  height: 100%;
  margin: auto;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  padding-bottom: 4rem;
`;

const SmallBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RankItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Num = styled.div`
  color: var(--black-80-base, #2e3032);
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.42857rem;
  letter-spacing: -0.084rem;
  position: absolute;
`;

const Name = styled.div`
  color: var(--black-80-base, #2e3032);
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.42857rem;
  letter-spacing: -0.084rem;
  margin-left: 1.5rem;
  margin-top: 0.5rem;
`;

const Current = styled.div`
  color: var(--black-80-base, #2e3032);
  text-align: right;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.42857rem;
  letter-spacing: -0.084rem;
`;

const Ratio = styled.div`
  text-align: right;
  font-family: Inter;
  font-size: 0.85714rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.14286rem;
  color: ${({ ratio }) => (parseFloat(ratio) >= 0 ? "red" : "blue")};
`;

const LogoImg = styled.img`
  width: 50px; /* 원하는 크기로 조정 */
  height: 50px; /* 원하는 크기로 조정 */
  object-fit: cover; /* 이미지의 가로세로 비율을 유지하면서 적절하게 보여줍니다 */
  border-radius: 50%;
  margin-left: 2rem;
`;

const numberWithCommas = (number) => {
  if (number === undefined) {
    return ""; // Return an empty string if the number is undefined
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const InterTradeRank = () => {
  const [rankData, setRankData] = useState([]);

  useEffect(() => {
    async function fetchTransactionRank() {
      try {
        const response = await axios.get(
          "https://stalksound.store/sonification/f_transaction_rank/"
        );
        if (parseInt(response.status / 100) === 2) {
          setRankData(response.data["시가총액 순위"]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchTransactionRank();
  }, []);

  function TextToSpeech(text) {
    const {
      "거래량 순위": rank,
      종목명: name,
      현재가: price,
      "전일 대비율": ratioYesterday,
    } = text;
    const t = `종목명: ${name}, 순위: ${rank}, 현재가: ${price}, 전일 대비율: ${ratioYesterday}`;
    const value = new SpeechSynthesisUtterance(t);
    window.speechSynthesis.speak(value);
  }

  return (
    <Box>
      <Container>
        {rankData.map((item, index) => (
          <RankItem
            key={item["종목코드"]}
            onDoubleClick={() => TextToSpeech(item)}
          >
            <SmallBox>
              <Num>{index + 1}</Num>
              <LogoImg src={item["이미지URL"]}></LogoImg>
              <Link
                to={`/detail/inter/${item["종목코드"]}`}
                style={{ textDecoration: "none" }}
              >
                <Name>{item["종목명"]}</Name>
              </Link>
            </SmallBox>
            <div>
              <Current>₩ {numberWithCommas(item["현재가"])}</Current>
              <Ratio ratio={item["전일 대비율"]}>{item["전일 대비율"]}%</Ratio>
            </div>
          </RankItem>
        ))}
      </Container>
    </Box>
  );
};

export default InterTradeRank;
