import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import axios from "axios";

const Week = (props) => {
  const [endDay, setEndDay] = useState("");
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // const today = new Date();
    // const year = String(today.getFullYear());
    // const month = String(today.getMonth() + 1).padStart(2, "0");
    // const date = String(today.getDate()).padStart(2, "0");
  
    // const endDay = `${year}${month}${date}`; // endDay 업데이트
    // console.log(endDay);

    // const currentDate = new Date(endDay);
    // const daysToSubtract = 6;
    // currentDate.setDate(currentDate.getDate() - daysToSubtract); 

    // console.log(endDay.getDate() - daysToSubtract);
    //currentDate.setDate(currentDate.getDate() - daysToSubtract); // currentDate를 수정하여 날짜를 계산함
  
    // const subtractedYear = String(currentDate.getFullYear());
    // const subtractedMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    // const subtractedDate = String(currentDate.getDate()).padStart(2, "0");
    
    // const beginDay = `${subtractedYear}${subtractedMonth}${subtractedDate}`;

  const d = new Date();

// 오늘날의 년, 월, 일 데이터
const day = d.getDate();
const month = d.getMonth();
const year = d.getFullYear();

// 어제 날짜 구하기
new Date(new Date().setDate(day - 1)).toLocaleDateString();


// 일주일 전 구하기
new Date(new Date().setDate(day - 7)).toLocaleDateString();


// 한달 전 구하기
new Date(new Date().setMonth(month - 1)).toLocaleDateString();


// 일년 전 구하기
new Date(new Date().setYear(year - 1)).toLocaleDateString();

    axios
      .get(`https://stalksound.store/sonification/day_data/`, {
        params: {
          symbol: `${props.StockID}`,
          begin: "20230801",
          end: endDay,
        },
      })
      .then((res) => {
        setStockData(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props.StockID]);
  
  


  // 날짜와 종가 데이터 추출
  var dates = stockData.map(function (item) {
    return item.날짜;
  });

  var prices = stockData
    .map(function (item) {
      return parseInt(item.현재가, 10);
    })
    .reverse();

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
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default Week;
