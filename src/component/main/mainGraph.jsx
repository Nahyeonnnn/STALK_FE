import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Kospi from "./graphlist/kospi";
import Kosdaq from "./graphlist/kosdaq";
import Nasdaq from "./graphlist/nasdaq";
import Spx from "./graphlist/spx";
import axios from "axios";

const ChartBox = styled.div`
  display: flex;
  width: 85vw;
  /* height: 33vh; */
  background-color: rgba(241, 208, 10, 0.92);
  border-radius: 1rem;
  margin: auto;
  position: relative;
`;

const ChartButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

const ChartButton = styled.button`
  background-color: ${({ isActive }) =>
    isActive ? "rgba(241, 208, 10, 0.92)" : "lightgray"};
  width: 5px;
  height: 12px;
  border-radius: 50%;
  border-style: none;
  margin: 10px 5px;
  cursor: pointer;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

const LeftArrow = styled(ArrowButton)`
  left: 0;
`;

const RightArrow = styled(ArrowButton)`
  right: 0;
`;

const MainGraph = () => {
  const [activeButton, setActiveButton] = useState(1);

  const [lista, setLista] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null); //audio 파일 저장
  const [isPlaying, setIsPlaying] = useState(false); //그래프 음향 출력 중복 방지

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveButton((prevButton) => (prevButton % 4) + 1);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleNextChart = () => {
    setActiveButton((prevButton) => (prevButton % 4) + 1);
  };

  const handlePreviousChart = () => {
    setActiveButton((prevButton) => ((prevButton - 2 + 4) % 4) + 1);
  };

  const highFunction = (text) => {
    setLista(text);
  };

  const renderInfo = () => {
    switch (activeButton) {
      case 1:
        return (
          <>
            <Kospi propFunction={highFunction} />
          </>
        );
      case 2:
        return (
          <>
            <Kosdaq propFunction={highFunction} />
          </>
        );
      case 3:
        return (
          <>
            <Spx propFunction={highFunction} />
          </>
        );
      case 4:
        return (
          <>
            <Nasdaq propFunction={highFunction} />
          </>
        );
      default:
        return (
          <>
            <Kospi propFunction={highFunction} />
          </>
        );
    }
  };

  return (
    <>
      <ChartBox onClick={playAudio}>
        {/* <LeftArrow onClick={handlePreviousChart}>&#8249;</LeftArrow>
        <RightArrow onClick={handleNextChart}>&#8250;</RightArrow> */}
        {/* <ChartType> 코스피</ChartType> */}
        {renderInfo()}
      </ChartBox>
      <ChartButtonBox>
        <ChartButton
          isActive={activeButton === 1}
          onClick={() => setActiveButton(1)}
        ></ChartButton>
        <ChartButton
          isActive={activeButton === 2}
          onClick={() => setActiveButton(2)}
        ></ChartButton>
        <ChartButton
          isActive={activeButton === 3}
          onClick={() => setActiveButton(3)}
        ></ChartButton>
        <ChartButton
          isActive={activeButton === 4}
          onClick={() => setActiveButton(4)}
        ></ChartButton>
      </ChartButtonBox>
    </>
  );
};

export default MainGraph;
