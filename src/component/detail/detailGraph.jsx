import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import Day from "./domesticGraphlist/day";
import Week from "./domesticGraphlist/week";
import Month from "./domesticGraphlist/month";
import Year from "./domesticGraphlist/year";

import Likebtn from "./likebtn/likebtn";

const SpaceBox = styled.div`
  display: flex;
  width: 3rem;
  height: 4.5rem;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85vw;
  /* height: 35vh; */
  background-color: rgba(241, 208, 10, 0.92);
  border-radius: 1rem;
  margin: auto;
`;

const ChartBox = styled.div`
  display: flex;
  background-color: white;
  width: 85vw;
  border-radius: 1rem 1rem 0rem 0rem;
`;

const ChartBtnBox = styled.div`
  display: flex;
  width: 85vw;
  height: 5vh;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const BtnBox = styled.div`
  display: flex;
  width: 33%;
  justify-content: center;
  color: ${({ isActive }) => (isActive ? "#FF3165" : "#3E497A")};
`;

const StockBox = styled.div`
  display: flex;
  margin: auto;
  margin-bottom: -0.5rem;
  border-radius: 1rem;
`;

const DetailGraph = () => {
  const { StockID1 } = useParams();
  const [active, setActive] = useState("Day");

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

  
  const highFunction = (text) => {
    setLista(text);
  };

  return (
    <>
      <SpaceBox></SpaceBox>
      <ChartContainer>
        <Likebtn></Likebtn>
        <ChartBox onClick={playAudio}>
          {active === "Day" && (
            <StockBox>
              <Day StockID={StockID1} propFunction={highFunction} />
            </StockBox>
          )}
          {active === "Week" && (
            <StockBox>
              <Week StockID={StockID1} propFunction={highFunction} />
            </StockBox>
          )}
          {active === "Month" && (
            <StockBox>
              <Month StockID={StockID1} propFunction={highFunction} />
            </StockBox>
          )}
          {active === "Year" && (
            <StockBox>
              <Year StockID={StockID1} propFunction={highFunction} />
            </StockBox>
          )}
        </ChartBox>
        <ChartBtnBox>
          <BtnBox isActive={active === "Day"} onClick={() => setActive("Day")}>
            1일
          </BtnBox>
          <BtnBox
            isActive={active === "Week"}
            onClick={() => setActive("Week")}
          >
            2주
          </BtnBox>
          <BtnBox
            isActive={active === "Month"}
            onClick={() => setActive("Month")}
          >
            3달
          </BtnBox>
          <BtnBox
            isActive={active === "Year"}
            onClick={() => setActive("Year")}
          >
            1년
          </BtnBox>
        </ChartBtnBox>
      </ChartContainer>
      <br />
    </>
  );
};

export default DetailGraph;
