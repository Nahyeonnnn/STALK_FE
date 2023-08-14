import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import axios from "axios";

const Day = (props) => {
  const [stockData, setStockData] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  let interval = [];

  const [lista, setLista] = useState(null); //lista 저장
  const [audioBuffer, setAudioBuffer] = useState(null); //audio 파일 저장

  useEffect(() => {
    axios
      .get(`https://stalksound.store/sonification/f_minute_data/`, {
        params: {
          symbol: `${props.StockID}`,
        },
      })
      .then((res) => {
        setLista(res.data.lista); //axios 연결 후 lista 데이터 저장 (추가한 코드)
        setStockData(res.data.data);
        console.log(res)

        setMaxPrice(
          Math.max(...res.data.data.map((item) => parseFloat(item.종가, 10)))
        );
        setMinPrice(
          Math.min(...res.data.data.map((item) => parseFloat(item.종가, 10)))
        );

        console.log(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props.StockID]);

  // 날짜와 종가 데이터 추출
  var dates = stockData.map(function (item) {
    return item.한국기준일자;
  });

  var prices = stockData
    .map(function (item) {
      return parseFloat(item.종가, 10);
    })
    .reverse();

  let gap; // 그래프 간격 조정 변수
  if (maxPrice >= 100) {
    // 10만 이상, 간격 : 100원
    gap = 0.1;
  } else if (maxPrice >= 10) {
    // 5만 이상, 간격 : 50원
    gap = 0.01;
  } else {
    gap = 0.001;
  }

  for (let i = minPrice - 2 * gap; i <= maxPrice + gap; i += gap) {
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
        name: "테슬라",
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

