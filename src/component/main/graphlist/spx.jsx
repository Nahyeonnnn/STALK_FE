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

const Spx = () => {
  const [stockData, setStockData] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  let interval = [];

  const [lista, setLista] = useState(null); //lista 저장
  const [audioBuffer, setAudioBuffer] = useState(null); //audio 파일 저장
  const [isPlaying, setIsPlaying] = useState(false); //그래프 음향 출력 중복 방지

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
      .get(`https://stalksound.store/sonification/f_a_day_data/`, {
        params: {
          symbol: "NDX", // S&P 500 : SPX , 나스닥 100 : NDX
          begin: beginDate,
          end: endDate,
        },
      })
      .then((res) => {
        setLista(res.data.lista); //axios 연결 후 lista 데이터 저장 (추가한 코드)
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

  let gap = 30; // 그래프 간격 조정 변수

  for (let i = minPrice - 30; i <= maxPrice + 30; i += gap) {
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

  useEffect(() => {
    //lista 저장 후 데이터를 소리로 변환
    if (lista !== null) {
      axios
        .post(
          `https://stalksound.store/sonification/data_to_sound/`,
          {
            lista: lista,
          },
          { responseType: "arraybuffer" }
        ) //arraybuffer 형태로 받아서
        .then(async (res) => {
          //AudioContext 생성
          const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
          const decodedBuffer = await audioContext.decodeAudioData(res.data); //decode
          setAudioBuffer(decodedBuffer); //디코딩된 정보 저장
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [lista]);

  //그래프 음향 출력
  const playAudio = () => {
    if (!isPlaying && audioBuffer) {
      setIsPlaying(true);
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.onended = () => {
        setIsPlaying(false); //재생 끝날 경우 false로 reset
      };
      source.start(0);
    }
  };

  return (
    <>
      <Container chartWidth={chartWidth}>
        <TextBox>
          <div>S&P 500</div>
          <AmountBox>{latelyPrices}</AmountBox>
        </TextBox>
        <StockBox onClick={playAudio}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </StockBox>
      </Container>
    </>
  );
};

export default Spx;
