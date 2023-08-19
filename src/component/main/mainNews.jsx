import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const NewsBox = styled.div`
  width: 90vw;
  margin: auto;
  color: white;
  padding-top: 1rem;
  padding-bottom: 4rem;
`;

const NewsEach = styled.div`
  //display: flex;
  justify-content: space-around;
  width: 90vw;
  margin-bottom: 1rem;
  border: 0.0625 solid #F1D00A;
`;

const NewsTitle = styled.div`
  font-weight: bold;
`;

const NewsSource = styled.div`
  font-weight: lighter;
  margin-top: 0.2rem;
  color: lightgray;
`;

const MainNews = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://stalksound.store/news/newslist/");
        setNewsData(response.data); 
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchData();
  }, []);

  // Pass article_id and office_id as parameters when navigating to /newsdetail
  // const handleNewsClick = (articleId, officeId) => {
  //   navigate("/newsdetail", { state: { articleId, officeId } });
  // };

  function TextToSpeech(text){
    console.log(text);
    const { "time_difference": time, "news_title": title, "news_provider": provider } = text;
    const t = `작성 시간: ${time}, 뉴스 제목: ${title}, ${provider}`;
    const value = new SpeechSynthesisUtterance(t);
    window.speechSynthesis.speak(value);
  }

  return (
    <>
      <NewsBox>
        {newsData &&
          Object.keys(newsData).map((key) => {
            const newsItem = newsData[key];
            return (
              <NewsEach
                key={newsItem.article_id}
                // onClick={() => handleNewsClick(newsItem.article_id, newsItem.office_id)}
                onDoubleClick={() => TextToSpeech(newsItem)}
              >
                <NewsTitle>{newsItem.news_title}</NewsTitle>
                <NewsSource>
                  {newsItem.news_provider} · {newsItem.time_difference}
                </NewsSource>
              </NewsEach>
            );
          })}
      </NewsBox>
    </>
  );
};

export default MainNews;
