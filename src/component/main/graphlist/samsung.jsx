import React, { useEffect } from "react";
import styled from "styled-components";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useState } from "react";
import axios from "axios";

const SamsungStockBox = styled.div`
  display: flex;
  width: 18rem;
  height: 13.5rem;
  margin: auto;
  background-color: coral;
  z-index: 1;
`;

const Samsung = () => {
  const [stockData, setStockData] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  let interval = [];

  const [lista, setLista] = useState(null); //lista 저장
  const [audioBuffer, setAudioBuffer] = useState(null); //audio 파일 저장

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
          symbol: "0001", // 코스피 0001 , 코스닥 1001
          begin: beginDate,
          end: endDate,
        },
      })
      .then((res) => {
        setLista(res.data.lista); //axios 연결 후 lista 데이터 저장 (추가한 코드)
        setStockData(res.data.data);

        setMaxPrice(
          Math.max(...res.data.data.map((item) => parseInt(item.현재가, 10)))
        );
        setMinPrice(
          Math.min(...res.data.data.map((item) => parseInt(item.현재가, 10)))
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // 날짜와 종가 데이터 추출
  var dates = data.response.body.items.item
    .map(function (item) {
      return item.basDt;
    })
    .reverse();

  var prices = data.response.body.items.item
    .map(function (item) {
      return parseInt(item.clpr, 10);
    })
    .reverse();

  // Highcharts options
  const options = {
    legend: {
      enabled: false,
    },
    chart: {
      type: "areaspline",
      width: 290,
      height: 220,
    },
    title: {
      text: "삼성전자",
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
    },
    yAxis: {
      //   tickInterval: 10,
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
        name: "Samsung",
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
        lineWidth: 1,
        lineColor: "blue", //blackborder
        marker: {
          enabled: false,
        },
      },
    },
  };

  return (
    <>
      <SamsungStockBox>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </SamsungStockBox>
    </>
  );
};

export default Samsung;
