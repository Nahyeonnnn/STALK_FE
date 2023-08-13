import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import axios from "axios";

const Week = (props) => {
  const [stockData, setStockData] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  let interval = [];

  const [lista, setLista] = useState(null); //lista 저장
  const [audioBuffer, setAudioBuffer] = useState(null);//audio 파일 저장

  useEffect(() => {
    // 2주일 전 구하기
    const currentDate = new Date();
    const daysToSubtract = 14; // 빼고 싶은 날짜 수

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
      .get(`https://stalksound.store/sonification/day_data/`, {
        params: {
          symbol: `${props.StockID}`,
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

  for (let i = minPrice - 500; i <= maxPrice; i += gap) {
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

  useEffect(() => {//lista 저장 후 데이터를 소리로 변환
    if (lista !== null) {
        axios
            .post(`https://stalksound.store/sonification/data_to_sound/`,{
                "lista" : lista
            }, { responseType: 'arraybuffer' }) //arraybuffer 형태로 받아서
            .then(async (res) => {
                console.log(res);//AudioContext 생성
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const decodedBuffer = await audioContext.decodeAudioData(res.data);//decode
                setAudioBuffer(decodedBuffer);//디코딩된 정보 저장
            })
            .catch((e) => {
                console.log(e);
            });
    }
  }, [lista]);

  //그래프 음향 출력
  const playAudio = () => {
    if (audioBuffer) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
    }
  };

  return (
    <div onClick={playAudio}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Week;