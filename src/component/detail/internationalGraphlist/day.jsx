import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import axios from "axios";

const Day = (props) => {
  const [stockData, setStockData] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);

  useEffect(() => {
    setStockData([]);
    const fetchData = async (end) => {
      try {
        const requests = timeIntervals.map(async (interval) => {
          const res = await axios.get(
            `https://stalksound.store/sonification/f_minute_data/`,
            {
              params: {
                symbol: `${props.StockID}`,
              },
            }
          );
          return res.data.data;
        });

        const responses = await Promise.all(requests);

        const newData = responses
          .flatMap((data) =>
            data.map((item) => ({
              종목: item.종목,
              날짜: item.날짜,
              시가: item.시가,
              현재가: item.현재가,
              고가: item.고가,
              저가: item.저가,
            }))
          )
          .sort((a, b) => a.날짜 - b.날짜); // 날짜 순으로 정렬

        setStockData(newData);

        setMaxPrice(
          Math.max(...newData.map((item) => parseInt(item.현재가, 10)))
        );
        setMinPrice(
          Math.min(...newData.map((item) => parseInt(item.현재가, 10)))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(timeIntervals[0]);
  }, []);

  // 날짜와 종가 데이터 추출
  var dates = stockData.map(function (item) {
    return item.날짜;
  });

  var prices = stockData
    .map(function (item) {
      return parseInt(item.현재가, 10);
    })
    .reverse();

  let gap = 100; // 그래프 간격 조정 변수
  if (maxPrice >= 100000) {
    // 10만 이상, 간격 : 100원
    gap = 100;
  } else if (maxPrice >= 50000) {
    // 5만 이상, 간격 : 50원
    gap = 50;
  } else if (maxPrice >= 10000) {
    // 1만 이상, 간격 : 10원
    gap = 10;
  } else {
    gap = 5;
  }

  for (let i = minPrice - (2 * gap); i <= maxPrice + gap; i += gap) {
    // graph 간격 조정
    interval.push(i);
  }

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
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default Day;