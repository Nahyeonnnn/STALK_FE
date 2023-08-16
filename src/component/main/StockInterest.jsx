import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
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

const WonSymbol = styled.span`
  font-size: 0.85714rem;
`;

const Price = styled.span`
  margin-left: 0.25rem;
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


const StockInterest = () => {
    const [interestList, setInterestList] = useState([]);
    const [stockData, setStockData] = useState({});
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://stalksound.store/sonification/user_info/', {
            headers: {
              accept: 'application/json',
              'X-CSRFToken': 'S9JIR40hR0jzCwMFq2fXdgVyCRhGvmiNVKQULMCV9n3bA29lLutZURCjf3K3py3W', // Replace with your actual CSRF token
            },
          });
          setInterestList(response.data.찜한목록);
        } catch (error) {
          console.error('찜한 목록 가져오기 실패:', error);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
        const fetchStockData = async () => {
          try {
            for (const item of interestList) {
              const response = await axios.get(
                "https://stalksound.store/sonification/now_data/",
                {
                  params: {
                    symbol: item.code
                  }
                }
              );
              setStockData(prevData => ({
                ...prevData,
                [item.code]: response.data.chart_data
              }));
            }
          } catch (error) {
            console.error('종목 데이터 가져오기 실패:', error);
          }
        };
      
        fetchStockData();
      }, [interestList]);
  
    return (
      <Box>
        <Container>
          {interestList.map((item, index) => (
            <RankItem key={item.code}>
              <div>
                <Num>{index + 1}</Num>
                <Link to={`/detail/${item.code}`} style={{ textDecoration: 'none' }}>
                  <Name>{item.prdt_name}</Name>
                </Link>
              </div>
              <div>
                <Current>
                  <WonSymbol>₩</WonSymbol>
                  <Price>{stockData[item.code]?.현재가}</Price>
                </Current>
                <Ratio ratio={stockData[item.code]?.['전일 대비율']}>
                  {parseFloat(stockData[item.code]?.['전일 대비율']).toFixed(2)}%
                </Ratio>
              </div>
            </RankItem>
          ))}
        </Container>
      </Box>
    );
  };
  
  export default StockInterest;