import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import axios from "axios";

const SpaceBox = styled.div`
  display: flex;
  width: 3rem;
  height: 4.5rem;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85vw;
  height: 34vh;
  background-color: rgba(241, 208, 10, 0.92);
  border-radius: 1rem;
  margin: auto;
`;

const ChartBox = styled.div`
  display: flex;
  width: 85vw;
  height: 29vh;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-radius: 1rem 1rem 0rem 0rem;
`;

const WeekChart = styled.div`
  display: flex;
  width: 78vw;
  height: 26vh;
  background-color: pink;
`;

const MonthChart = styled.div`
  display: flex;
  width: 78vw;
  height: 26vh;
  background-color: green;
`;

const ChartBtnBox = styled.div`
  display: flex;
  width: 85vw;
  height: 5vh;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const BtnBox = styled.div`
  display: flex;
  width: 33%;
  justify-content: center;
  color: ${({ isActive }) => (isActive ? "#FF3165" : "#3E497A")};
`;

const StockBox = styled.div`
  display: flex;
  width: 18rem;
  height: 13.5rem;
  margin: auto;
  background-color: coral;
  z-index: 1;
`;

const DetailGraph = (props) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줌
  const date = today.getDate();

  const { StockID } = useParams();
  const [active, setActive] = useState("Day");
  const [currentTime, setCurrentTime] = useState("");
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const today = new Date();
      let hours = today.getHours();
      let minutes = today.getMinutes();
      let seconds = today.getSeconds();

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      setCurrentTime(`${hours}${minutes}${seconds}`);
    }, 60000);
    // 컴포넌트가 언마운트될 때 interval 해제
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async (end) => {
      try {
        const res = await axios.get(`https://stalksound.store/sonification/repeat_minute_data/`, {
          params: {
            count : 6,
            symbol: StockID, // 삼성전자 : 005930 `${props.StockID}`
            end: end,
          },
        });
  
        const newData = res.data.data.map((item) => ({
          종목: item.종목,
          날짜: item.날짜,
          시가: item.시가,
          현재가: item.현재가,
          고가: item.고가,
          // ... 여기에 필요한 다른 종목 정보를 추가로 추출할 수 있습니다.
        }));
  
        // 이전 데이터와 새로운 데이터를 합쳐서 업데이트
        setStockData((prevData) => prevData.concat(newData));
      } catch (error) {
        console.log(error);
      }
    };

    if (active === "Day") {
      setStockData([])
      fetchData("150000"); // 30
      console.log(stockData);

    } else if (active === "Week") {
      setStockData([]);
      axios
        .get(`https://stalksound.store/sonification/day_data/`, {
          params: {
            symbol: "005930", // 삼성전자 : 005930 `${props.StockID}`
            begin: "20230601",
            end: "20230607",
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (active === "Month") {
      setStockData([]);
      axios
        .get(`https://stalksound.store/sonification/now_data/`, {
          params: {
            symbol: "005930", // 삼성전자 : 005930 `${props.StockID}`
            // begin: "20230601",
            // end: "20230701",
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [active, currentTime]);

  // 날짜와 종가 데이터 추출
  var dates = stockData.map(function (item) {
    return item.날짜;
  });

  var prices = stockData
    .map(function (item) {
      return parseInt(item.현재가, 10);
    })
    .reverse();

  // Highcharts options
  const options = {
    credits:{
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    chart: {
      type: "areaspline",
      width: 290,
      height: 220,
    },
    title: {
      text: stockData.length > 0 ? stockData[0].종목 : "",
    },
    xAxis: {
      categories: dates, // 날짜
      title: {
        // text: "Date",
      },
      labels: {
        formatter: function () {
          const date = new Date(this.value);
          return Highcharts.dateFormat("%m-%d", date.getTime());
        },
      },
      enabled: false,
    },
    yAxis: {
      tickPositions: [68000, 68500, 69000, 69500],
      title: {
        text: null,
      },
      labels: {
        enabled: false,
        visible: false,
      },
    },
    series: [
      {
        type: "areaspline",
        name: stockData.length > 0 ? stockData[0].종목 : "",
        data: prices,
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "rgb(0, 0, 255)"], // blue at the top
            [1, "rgb(255, 255, 255)"], // white at the bottom
          ],
        },
        fillOpacity: 0.4,
      },
    ],
    plotOptions: {
      areaspline: {
        lineWidth: 0.2,
        lineColor: "blue", //blackborder
        marker: {
          enabled: false,
        },
      },
    },
  };

  return (
    <>
      <SpaceBox></SpaceBox>
      <ChartContainer>
        <ChartBox>
          {active === "Day" && (
            <StockBox>
              <HighchartsReact highcharts={Highcharts} options={options} />
            </StockBox>
          )}
          {active === "Week" && <WeekChart></WeekChart>}
          {active === "Month" && <MonthChart></MonthChart>}
        </ChartBox>

        <ChartBtnBox>
          <BtnBox isActive={active === "Day"} onClick={() => setActive("Day")}>
            1일
          </BtnBox>
          <BtnBox
            isActive={active === "Week"}
            onClick={() => setActive("Week")}
          >
            1주
          </BtnBox>
          <BtnBox
            isActive={active === "Month"}
            onClick={() => setActive("Month")}
          >
            1달
          </BtnBox>
        </ChartBtnBox>
      </ChartContainer>
      <br />
    </>
  );
};

export default DetailGraph;