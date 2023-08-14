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
  color: var(--black-80-base, #2E3032);
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.42857rem;
  letter-spacing: -0.084rem;
`;

const Name = styled.div`
  color: var(--black-80-base, #2E3032);
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.42857rem;
  letter-spacing: -0.084rem;
  margin-left: 2rem;
`;

const Current = styled.div`
  color: var(--black-80-base, #2E3032);
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

const TradeRank = () => {
  const [rankData, setRankData] = useState([]);

  useEffect(() => {
    async function fetchTransactionRank() {
      try {
        const response = await axios.get("https://stalksound.store/sonification/transaction_rank/");
        if (response.status === 200) {
          setRankData(response.data["거래량 순위"]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchTransactionRank();
  }, []);

  return (
    <Box>
      <Container>
        {rankData.map((item) => (
          <RankItem key={item["거래량 순위"]}>
            <div>
              <Num>{item["거래량 순위"]}</Num>
              <Link to={`/detail/${item["종목코드"]}`}
              style={{ textDecoration: "none" }}>
                <Name>{item["종목명"]}</Name>
              </Link>
            </div>
            <div>
              <Current>{item["현재가"]}</Current>
              <Ratio ratio={item["전일 대비율"]}>{item["전일 대비율"]}%</Ratio>
            </div>
          </RankItem>
        ))}
      </Container>
    </Box>
  );
};

export default TradeRank;
