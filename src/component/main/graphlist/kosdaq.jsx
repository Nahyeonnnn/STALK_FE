import React, { useEffect } from "react";
import styled from "styled-components";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useState } from "react";
import axios from "axios";

const StockBox = styled.div`
  margin: auto;
`;

const Container = styled.div`
  margin: auto;
  margin-top: 0.5rem;
  margin-bottom: -0.9rem;
  position: relative; // 컨테이너 위치를 상대적으로 설정
  width: ${(props) => props.chartWidth}px; // chartWidth 값을 사용하여 너비 설정
`;

const TextBox = styled.div`
  color: white;
  color: #21325e;
  position: absolute;
  margin-top: 0.5rem;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
  /* font-weight: bold; */
  font-size: 1rem;
  font-weight: bold;
  /* display: flex; */
`;

const AmountBox = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Kosdaq = (props) => {
  const [stockData, setStockData] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  let interval = [];

  useEffect(() => {
    const currentDate = new Date();
    const daysToSubtract = 30; // 빼고 싶은 날짜 수

    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, "0");
    let date = String(currentDate.getDate()).padStart(2, "0");

    const endDate = `${year}${month}${date}`; // 현재 날짜

    currentDate.setDate(currentDate.getDate() - daysToSubtract);

    year = currentDate.getFullYear();
    month = String(currentDate.getMonth() + 1).padStart(2, "0");
    date = String(currentDate.getDate()).padStart(2, "0");

    const beginDate = `${year}${month}${date}`; // 일주일 전 날짜

    axios
      .get(`https://stalksound.store/sonification/a_day_data/`, {
        params: {
          symbol: "1001", // 코스피 0001 , 코스닥 1001
          begin: beginDate,
          end: endDate,
        },
      })
      .then((res) => {
        props.propFunction(res.data.lista);
        setStockData(res.data.data);

        setMaxPrice(
          Math.max(...res.data.data.map((item) => parseFloat(item.시가, 10)))
        );
        setMinPrice(
          Math.min(...res.data.data.map((item) => parseFloat(item.시가, 10)))
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // 날짜와 종가 데이터 추출
  var dates = stockData.map(function (item) {
    return item.일자;
  });

  var prices = stockData.map(function (item) {
    return parseFloat(item.시가, 10);
  });

  var latelyPrices = prices[prices.length - 1];

  let gap = 10; // 그래프 간격 조정 변수

  for (let i = minPrice - 10; i <= maxPrice + 10; i += gap) {
    // graph 간격 조정
    interval.push(i);
  }

  // viewport에 따른 그래프 width 값 설정
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.85);

  const handleWindowResize = () => {
    setChartWidth(window.innerWidth * 0.85); // 예시로 80%로 설정, 필요에 따라 조절 가능
  };

  useEffect(() => {
    // 윈도우 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleWindowResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // Highcharts options
  const options = {
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    chart: {
      type: "areaspline",
      width: chartWidth,
      height: 220,
      backgroundColor: "rgba(0, 0, 0, 0)", // 투명 배경
      borderRadius: 16, // 테두리 둥글게 설정
    },
    title: {
      // text: `<span style="font-size: 0.8rem; font-weight: bold;">코스피</span><br><span style="font-size: 1.2rem; font-weight: normal;">${latelyPrices}</span>`,
      text: "",
      style: {
        fontSize: "1rem",
        color: "white",
      },
      align: "left", // 제목을 좌측으로 정렬
      y: 20, // 제목의 위쪽 여백을 조절
    },
    xAxis: {
      categories: dates,
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
      visible: false,
    },
    yAxis: {
      tickPositions: interval,
      gridLineWidth: 0.15, // 눈금 굵기
      title: {
        text: null,
      },
      labels: {
        enabled: false,
        visible: false,
      },
      gridLineColor: "#21325E", //눈금 색상 설정 가능!
    },
    series: [
      {
        type: "areaspline",
        name: stockData.length > 0 ? stockData[0].업종 : "",
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
        // lineWidth: 0.2,
        lineWidth: 1.5,
        lineColor: "#21325E",
        marker: {
          enabled: false,
        },
      },
    },
  };

  return (
    <>
      <Container chartWidth={chartWidth}>
        <TextBox>
          <div>KOSDAQ</div>
          <AmountBox>{latelyPrices}</AmountBox>
        </TextBox>
        <StockBox>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </StockBox>
      </Container>
    </>
  );
};

export default Kosdaq;
