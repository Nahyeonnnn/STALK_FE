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
`;

const Name = styled.div`
  color: var(--black-80-base, #2e3032);
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.42857rem;
  letter-spacing: -0.084rem;
  margin-left: 2rem;
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

const Price = styled.span`
  margin-left: 0.25rem;
`;

const numberWithCommas = (number) => {
  if (number === undefined) {
    return ""; // Return an empty string if the number is undefined
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Ratio = styled.div`
  text-align: right;
  font-family: Inter;
  font-size: 0.85714rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.14286rem;
  color: ${({ ratio }) => (parseFloat(ratio) >= 0 ? "red" : "blue")};
`;

const TradeRank = () => {
  const [rankData, setRankData] = useState([]);

  useEffect(() => {
    async function fetchTransactionRank() {
      try {
        const response = await axios.get(
          "https://stalksound.store/sonification/transaction_rank/"
        );
        if (response.status === 200) {
          setRankData(response.data["시가총액 순위"]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchTransactionRank();
  }, []);

  function TextToSpeech(text) {
    console.log(text);
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
            <div>
              <Num>{index + 1}</Num>
              <Link
                to={`/detail/${item["종목코드"]}`}
                style={{ textDecoration: "none" }}
              >
                <Name>{item["종목명"]}</Name>
              </Link>
            </div>
            <div>
              <Current>
                <Price>\ {numberWithCommas(item["현재가"])}</Price>
              </Current>
              <Ratio ratio={item["전일 대비율"]}>
                {parseFloat(item["전일 대비율"]).toFixed(2)}%
              </Ratio>
            </div>
          </RankItem>
        ))}
      </Container>
    </Box>
  );
};

export default TradeRank;
