import React, { useState, useEffect, useCallback } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import axios from "axios";
import { stockList } from "../../search/searchBar";

const Week = ({StockID, propFunction}) => {
  const [stockData, setStockData] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  let interval = [];

  const stock = stockList.find((item) => item.code === `${StockID}`);

  const fetchData = useCallback(async () => {
    const currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, "0");
    let date = String(currentDate.getDate()).padStart(2, "0");

    const endDate = `${year}${month}${date}`; // 현재 날짜

    try {
      const response = await axios.get(`https://stalksound.store/sonification/f_day_data/`, {
        params: {
          symbol: `${StockID}`,
          end: endDate,
        },
      });
      propFunction(response.data.lista);
      setStockData(response.data.data);

      setMaxPrice(
        Math.max(...response.data.data.slice(-10).map((item) => parseFloat(item.종가, 10)))
        );
        setMinPrice(
        Math.min(...response.data.data.slice(-10).map((item) => parseFloat(item.종가, 10)))
        );
    } catch (error) {
      console.log(error);
    }
  }, [StockID, propFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

 // 날짜와 종가 데이터 추출
 var dates = stockData.slice(-10).map(function (item) {
  return item.날짜;
});

var prices = stockData
  .slice(-10)
  .map(function (item) {
    return parseFloat(item.종가, 10);
  })
  .reverse();

  let gap; // 그래프 간격 조정 변수
  if (maxPrice >= 1000) {
    // 1000 이상, 간격: 10
    gap = 50;
  } else if (maxPrice >= 100) {
    // 100 이상, 간격: 1
    gap = 10;
  } else if (maxPrice >= 10) {
    // 10 이상, 간격: 0.1
    gap = 1;
  } else if (maxPrice >= 1) {
    // 1 이상, 간격: 0.01
    gap = 0.1;
  } else {
    // 1 미만, 간격: 0.001
    gap = 0.01;
  }

  for (let i = minPrice - gap; i <= maxPrice + gap; i += gap) {
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

  // 그래프 옵션 options
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
      text: stock.prdt_name,
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
      visible: false,
    },
    yAxis: {
      tickPositions: interval,
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
        name: stock.prdt_name,
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
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Week;