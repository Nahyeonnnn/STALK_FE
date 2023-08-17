import React, { useState, useEffect, useCallback } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import axios from "axios";

const Month = ({StockID, propFunction}) => {
  const [stockData, setStockData] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  let interval = [];

  const fetchData = useCallback(async () => {
    const currentDate = new Date();
    const daysToSubtract = 90;

    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, "0");
    let date = String(currentDate.getDate()).padStart(2, "0");

    const endDate = `${year}${month}${date}`;

    currentDate.setDate(currentDate.getDate() - daysToSubtract);

    year = currentDate.getFullYear();
    month = String(currentDate.getMonth() + 1).padStart(2, "0");
    date = String(currentDate.getDate()).padStart(2, "0");

    const beginDate = `${year}${month}${date}`;

    try {
      const res = await axios.get(`https://stalksound.store/sonification/day_data/`, {
        params: {
          symbol: `${StockID}`,
          begin: beginDate,
          end: endDate,
        },
      });
      propFunction(res.data.lista);
      setStockData(res.data.data);

      setMaxPrice(
        Math.max(...res.data.data.map((item) => parseInt(item.시가, 10)))
      );
      setMinPrice(
        Math.min(...res.data.data.map((item) => parseInt(item.시가, 10)))
      );
    } catch (e) {
      console.log(e);
    }
  }, [StockID, propFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // useEffect(() => {
  //   // 3달 전 구하기
  //   const currentDate = new Date();
  //   const daysToSubtract = 90; // 빼고 싶은 날짜 수

  //   let year = currentDate.getFullYear();
  //   let month = String(currentDate.getMonth() + 1).padStart(2, "0");
  //   let date = String(currentDate.getDate()).padStart(2, "0");

  //   const endDate = `${year}${month}${date}`; // 현재 날짜

  //   currentDate.setDate(currentDate.getDate() - daysToSubtract);

  //   year = currentDate.getFullYear();
  //   month = String(currentDate.getMonth() + 1).padStart(2, "0");
  //   date = String(currentDate.getDate()).padStart(2, "0");

  //   const beginDate = `${year}${month}${date}`; // 일주일 전 날짜

  //   axios
  //     .get(`https://stalksound.store/sonification/day_data/`, {
  //       params: {
  //         symbol: `${props.StockID}`,
  //         begin: beginDate,
  //         end: endDate,
  //       },
  //     })
  //     .then((res) => {
  //       props.propFunction(res.data.lista);
  //       setStockData(res.data.data);

  //       setMaxPrice(
  //         Math.max(...res.data.data.map((item) => parseInt(item.시가, 10)))
  //       );
  //       setMinPrice(
  //         Math.min(...res.data.data.map((item) => parseInt(item.시가, 10)))
  //       );
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, [props.StockID]);

  // 날짜와 종가 데이터 추출
  var dates = stockData.map(function (item) {
    return item.날짜;
  });

  var prices = stockData
    .map(function (item) {
      return parseInt(item.시가, 10);
    })

  let gap; // 그래프 간격 조정 변수
  if (maxPrice >= 100000) {
    // 10만 이상, 간격 : 1000원
    gap = 1000;
  } else if (maxPrice >= 50000) {
    // 5만 이상, 간격 : 500원
    gap = 500;
  } else if (maxPrice >= 10000) {
    // 1만 이상, 간격 : 100원
    gap = 100;
  } else if (maxPrice >= 5000) {
    // 5천 이상, 간격 : 50원
    gap = 50;
  } else {
    // 5천 미만, 간격 : 10원
    gap = 10;
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
      text: stockData.length > 0 ? stockData[0].종목 : "",
      style: {
        fontSize: "1rem",
      },
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
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Month;
