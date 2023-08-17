import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";

const NewsBox = styled.div`
  width: 85vw;
  height: 100%;
  background-color: white;
  border-radius: 0.625rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1.5rem;
  padding-bottom: 4rem;
`;
const NewsEach = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80vw;
  margin-bottom: 1rem;
  margin-left: 1rem;
`;

const NewsTitle = styled.div`
  width: 80vw;
  font-weight: bold;
  margin-top: 1rem;
`;

const NewsSource = styled.div`
  font-weight: lighter;
  margin-top: 0.2rem;
  color: lightgray;
`;

const DetailNews = (props) => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const apiUrl = `https://stalksound.store/news/stockcode/?stock_code=${props.stockID}`;
    
    axios
      .get(apiUrl)
      .then((response) => {
        setNewsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
  }, [props.stockID]);

  // const handleNewsClick = () => {
  //   navigate("/newsdetail");
  // };

  function TextToSpeech(text){
    console.log(text);
    const { "title": news_title, "time_difference": time } = text;
    const t = `뉴스 제목: ${news_title}, 작성 시간: ${time}`;
    const value = new SpeechSynthesisUtterance(t);
    window.speechSynthesis.speak(value);
  }

  return (
    <>
      <NewsBox>
        {Object.values(newsData).map((news, index) => (
          <NewsEach key={index} 
          // onClick={handleNewsClick} //뉴스디테일 구현 전까지 잠깐 주석처리 해놓겠습니당
          onDoubleClick={()=>TextToSpeech(news)}
          >
            <NewsTitle dangerouslySetInnerHTML={{ __html: news.title }} />
            <NewsSource>{`${news.time_difference}`}</NewsSource>
          </NewsEach>
        ))}
      </NewsBox>
    </>
  );
};

export default DetailNews;