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
  object-fit: cover; 
  border-radius: 50%;
  margin-left: 2rem;
`;


const SmallBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;



const StockInterest = () => {
  const [stockData, setStockData] = useState({});
  const [filteredInterestList, setFilteredInterestList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://stalksound.store/sonification/user_info/"
        );
        const interestList = response.data["찜한목록"];
        setFilteredInterestList(interestList);

        // Fetch stock data for each favorite item
        const stockDataPromises = interestList.map(async (item) => {
          try {
            const stockResponse = await axios.get(
              `https://stalksound.store/sonification/now_data/?symbol=${item.code}`
            );
            return { code: item.code, data: stockResponse.data.chart_data };
          } catch (error) {
            console.error(`Error fetching data for ${item.code}:`, error);
            return null;
          }
        });

        const stockDataMap = {};
        const stockResults = await Promise.all(stockDataPromises);

        stockResults.forEach((result) => {
          if (result) {
            stockDataMap[result.code] = result.data;
          }
        });

        setStockData(stockDataMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const numberWithCommas = (number) => {
    if (number === undefined) {
      return "";
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Box>
      <Container>
        {filteredInterestList
          .filter((item) => item.is_domestic_stock) // Filter only domestic stocks
          .map((item, index) => (
            <RankItem key={item.code}>
              <SmallBox>
              
                <Num>{index + 1}</Num>
                <LogoImg src={item["stock_image"]}></LogoImg>
                <Link
                  to={`/detail/${item.code}`}
                  style={{ textDecoration: "none" }}
                >
                  <Name>{item.prdt_name}</Name>
                </Link>
                </SmallBox>

              <div>
                <Current>
                  <Price>
                    ₩ {numberWithCommas(stockData[item.code]?.현재가)}
                  </Price>
                </Current>
                <Ratio ratio={stockData[item.code]?.["전일 대비율"]}>
                  {parseFloat(stockData[item.code]?.["전일 대비율"]).toFixed(2)}
                  %
                </Ratio>
              </div>
            </RankItem>
          ))}
      </Container>
    </Box>
  );
};

export default StockInterest;
