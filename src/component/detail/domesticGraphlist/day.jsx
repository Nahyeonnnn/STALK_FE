import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import axios from "axios";

const Day = (props) => {
  const [stockData, setStockData] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [interval, setInterval] = useState([]);

  const [lista, setLista] = useState(null); //lista 저장
  const [audioBuffer, setAudioBuffer] = useState(null); //audio 파일 저장
  const [isPlaying, setIsPlaying] = useState(false); //그래프 음향 출력 중복 방지

  const getFormattedTime = (time) => {
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");
    return `${hours}${minutes}${seconds}`;
  };

  const generateTimeIntervals = (currentTime, interval, count) => {
    const intervals = [];
    for (let i = 0; i < count; i++) {
      intervals.push(currentTime - i * interval);
    }
    return intervals;
  };

  const currentTime = new Date();
  const currentTimeString = getFormattedTime(currentTime);
  const timeIntervals = generateTimeIntervals(
    currentTimeString,
    30000, // 30분을 밀리초로 변환
    8 // 총 8개의 간격 생성 (2시간 분량)
  );

  useEffect(() => {
    setStockData([]);
    const fetchData = async (end) => {
      try {
        const requests = timeIntervals.map(async (interval) => {
          const res = await axios.get(
            `https://stalksound.store/sonification/hmm__minute_data/`,
            {
              params: {
                symbol: `${props.StockID}`,
                end: interval,
              },
            }
          );
          setLista(res.data.lista); //axios 연결 후 lista 데이터 저장 (추가한 코드)
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
  }, [props.StockID]);

  // 날짜와 종가 데이터 추출
  var dates = stockData.map(function (item) {
    return item.날짜;
  });

  var prices = stockData
    .map(function (item) {
      return parseInt(item.현재가, 10);
    });

  useEffect(() => {
    // Calculate graph intervals
    let gap = 100; // 그래프 간격 조정 변수
    if (maxPrice >= 100000) {
      gap = 100;
    } else if (maxPrice >= 50000) {
      gap = 50;
    } else if (maxPrice >= 10000) {
      gap = 10;
    } else {
      gap = 5;
    }

    const updatedInterval = [];
    for (let i = minPrice - gap; i <= maxPrice + gap; i += gap) {
      updatedInterval.push(i);
    }
    setInterval(updatedInterval);
  }, [maxPrice, minPrice]);

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
      categories: dates, // 날짜국내
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
      visible: false, // x축 숨기기
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
        type: "line",
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
          console.log(res); //AudioContext 생성
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
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
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
      <div onClick={playAudio}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
};

export default Day;
