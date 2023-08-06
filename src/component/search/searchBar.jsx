import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import NaverIcon from "./NaverIcon.png";

library.add(faMagnifyingGlass);

//axios 연결 시 받을 주식 리스트 예시
const testList = [
  { prdt_name: "삼성전자우", code: "005935" },
  { prdt_name: "삼성전자", code: "005930" },
  { prdt_name: "LG엔솔", code: "373220" },
  { prdt_name: "SK하이닉스", code: "000660" },
  { prdt_name: "LG 화학", code: "051915" },
  { prdt_name: "삼성바이오로직스", code: "207940" },
  { prdt_name: "현대차3우B", code: "005389" },
  { prdt_name: "현대차우", code: "005385" },
  { prdt_name: "현대차2우B", code: "005387" },
  { prdt_name: "LG화학", code: "051910" },
  { prdt_name: "POSCO홀딩스", code: "005490" },
  { prdt_name: "삼성SDI우", code: "006405" },
  { prdt_name: "삼성SDI", code: "006400" },
  { prdt_name: "현대차", code: "005380" },
  { prdt_name: "에코프로비엠", code: "247540" },
  { prdt_name: "포스코퓨처엠", code: "003670" },
  { prdt_name: "NAVER", code: "035420" },
  { prdt_name: "기아", code: "000270" },
  { prdt_name: "에코프로", code: "086520" },
  { prdt_name: "삼성물산우B", code: "02826K" },
  { prdt_name: "LG전자우", code: "066575" },
  { prdt_name: "LG생활건강우", code: "051905" },
  { prdt_name: "카카오", code: "035720" },
  { prdt_name: "SK이노우", code: "096775" },
  { prdt_name: "현대모비스", code: "012330" },
  { prdt_name: "셀트리온", code: "068270" },
  { prdt_name: "KB금융", code: "105560" },
  { prdt_name: "SK우", code: "03473K" },
  { prdt_name: "신한지주", code: "055550" },
  { prdt_name: "LG전자", code: "066570" },
  { prdt_name: "SK이노베이션", code: "096770" },
  { prdt_name: "삼성물산", code: "028260" },
  { prdt_name: "LG우", code: "003555" },
  { prdt_name: "포스코인터내셔널", code: "047050" },
  { prdt_name: "삼성전기우", code: "009155" },
  { prdt_name: "카카오뱅크", code: "323410" },
  { prdt_name: "아모레퍼시픽우", code: "090435" },
  { prdt_name: "LG", code: "003550" },
  { prdt_name: "삼성생명", code: "032830" },
  { prdt_name: "한국전력", code: "015760" },
  { prdt_name: "현대중공업", code: "329180" },
  { prdt_name: "하나금융지주", code: "086790" },
  { prdt_name: "삼성전기", code: "009150" },
  { prdt_name: "S-Oil우", code: "010955" },
  { prdt_name: "두산에너빌리티", code: "034020" },
  { prdt_name: "삼성화재 우선주", code: "000815" },
  { prdt_name: "셀트리온헬스케어", code: "091990" },
  { prdt_name: "삼성SDS", code: "018260" },
  { prdt_name: "한화오션", code: "042660" },
  { prdt_name: "하이브", code: "352820" },
  { prdt_name: "대한항공우", code: "003495" },
  { prdt_name: "SK텔레콤", code: "017670" },
  { prdt_name: "삼성화재", code: "000810" },
  { prdt_name: "고려아연", code: "010130" },
  { prdt_name: "KT&G", code: "033780" },
  { prdt_name: "메리츠금융지주", code: "138040" },
  { prdt_name: "대한항공", code: "003490" },
  { prdt_name: "HD한국조선해양", code: "009540" },
  { prdt_name: "S-oil", code: "010950" },
  { prdt_name: "HMM", code: "011200" },
  { prdt_name: "SK그룹", code: "034730" },
  { prdt_name: "우리금융지주", code: "316140" },
  { prdt_name: "금양", code: "001570" },
  { prdt_name: "기업은행", code: "024110" },
  { prdt_name: "엘앤에프", code: "066970" },
  { prdt_name: "크래프톤", code: "259960" },
  { prdt_name: "삼성중공업", code: "010140" },
  { prdt_name: "KT", code: "030200" },
  { prdt_name: "SKIET", code: "361610" },
  { prdt_name: "CJ제일우", code: "097955" },
  { prdt_name: "한화케미칼우", code: "009835" },
  { prdt_name: "카카오페이", code: "377300" },
  { prdt_name: "삼성엔지니어링", code: "028050" },
  { prdt_name: "SK 바이오팜", code: "326030" },
  { prdt_name: "아모레퍼시픽", code: "090430" },
  { prdt_name: "LG생활건강", code: "051900" },
  { prdt_name: "롯데케미칼", code: "011170" },
  { prdt_name: "한화솔루션", code: "009830" },
  { prdt_name: "금호석유우", code: "011785" },
  { prdt_name: "현대글로비스", code: "086280" },
  { prdt_name: "미래에셋우", code: "006805" },
  { prdt_name: "미래에셋대우2우b", code: "00680K" },
  { prdt_name: "LG이노텍", code: "011070" },
  { prdt_name: "한화에어로스페이스", code: "012450" },
  { prdt_name: "SK스퀘어", code: "402340" },
  { prdt_name: "현대건설우", code: "000725" },
  { prdt_name: "SK바사", code: "302440" },
  { prdt_name: "한국금융우", code: "071055" },
  { prdt_name: "엔씨소프트", code: "036570" },
  { prdt_name: "두산밥캣", code: "241560" },
  { prdt_name: "코스모신소재", code: "005070" },
  { prdt_name: "유한양행", code: "000100" },
  { prdt_name: "포스코DX", code: "022100" },
  { prdt_name: "아모레G우", code: "002795" },
  { prdt_name: "한미반도체", code: "042700" },
  { prdt_name: "LG디스플레이", code: "034220" },
  { prdt_name: "한국타이어앤테크놀로지", code: "161390" },
  { prdt_name: "맥쿼리인프라", code: "088980" },
  { prdt_name: "현대제철", code: "004020" },
  { prdt_name: "한국항공우주", code: "047810" },
];

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  z-index: 2;
  position: absolute;
  color: gray;
  top: 2.8rem;
  left: 0.6rem;
  pointer-events: none; /* This prevents the icon from blocking the input field */
`;

const SearchSmallContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  border: 0;
  background-color: var(--gray, #f9f9f9);
  width: 75vw;
  height: 1.5rem;
  border-radius: 12px;
  padding: 0.625rem 1rem 0.625rem 2rem;
  margin-top: 2rem;
  z-index: 1;
`;

const AutoSearchContainer = styled.div`
  position: absolute;
  border: none;
  top: 5rem;
  /* left: 2rem; */
  width: 85vw;
`;

const AutoSearchData = styled.p`
  margin: 0%;
  padding-left: 2.5rem;
  width: inherit;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 2px;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

const EachDataDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
`;

const EachStockDataDiv = styled.div`
  position: relative;
`;

const EachStockData = styled.p`
  font-size: 12px;
  color: gray;
  margin: 0;
  padding-left: 2.5rem;
`;

const EachStockIcon = styled.img`
  position: absolute;
  width: 1.875rem;
  border-radius: 50%;
`;

const EachPercentDataDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const StockPrice = styled.p`
  margin: 0;
  font-size: 12px;
  margin-left: auto;
  color: white;
  font-weight: bold;
`;

const PercentData = styled.p`
  margin: 0;
  font-size: 12px;
  margin-left: auto;
  color: red; //조건 줘서 올라갈 경우 red, 내려갈 경우 blue로 보이게 설정하기
`;

const RecentSearch = styled.p`
  color: white;
  font-weight: bold;
  margin: 0;
  padding-top: 1rem;
`;

const SearchBar = () => {
  const [stockList, setStockList] = useState(testList); //axios 연결 시 주식 리스트를 저장할 변수
  const [query, setQuery] = useState(""); //검색어를 저장하기 위한 useState
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearchData, setRecentSearch] = useState([]); //최근 검색한 데이터 useState

  function handleInputSearch(e) {
    // Input tag 내부의 값을 변수에 저장
    const { value } = e.target;
    setQuery(value);
    const SearchSuggestions = getSuggestions(value);
    setSuggestions(SearchSuggestions);
    setShowSuggestions(true);
  }

  const getSuggestions = (value) => {
    //검색어 자동 완성 결과를 가져오는 로직을 구현합니다.
    //예시: 데이터는 배열 형태로 가정하고, 배열 요소 중에 입력된 검색어를 포함하는 항목들을 추출

    const filteredSuggestions = stockList.filter((item) =>
      item.prdt_name.includes(value)
    );
    return filteredSuggestions;
  };

  const handleKeyPress = (e) => {
    //엔터를 눌렀을 때 실행할 함수
    if (e.key === "Enter") {
      e.preventDefault();
      handleInputSearch(e);
      let newSearch = query;
      let newSearchArray = recentSearchData;

      if (newSearchArray === null) {
        newSearchArray = [];
      }

      let isInList = testList.some((item) => item.prdt_name === newSearch);

      if (isInList === true) {
        newSearchArray.unshift(newSearch);
        //중복 방지를 위해 Set 사용
        newSearchArray = new Set(newSearchArray);
        newSearchArray = [...newSearchArray];
      }

      if (newSearchArray.length > 5) {
        newSearchArray.length = 5;
      }
      setRecentSearch(newSearchArray);
      localStorage.setItem("recent", JSON.stringify(newSearchArray));
    }
  };

  useEffect(() => {
    const recentSearchDataString = localStorage.getItem("recent");

    if (
      recentSearchDataString === null ||
      recentSearchDataString === undefined ||
      recentSearchDataString === {}
    ) {
      //localStorage에 데이터가 없을 경우
      setRecentSearch([]);
      //빈 배열 만들기
    } else {
      //localStorage에 데이터가 있는 경우 받은 데이터를 JSON 해제(?)
      setRecentSearch(JSON.parse(recentSearchDataString));
    }
  }, []); //처음 렌더링 될 때만 실행되게 함

  return (
    <>
      <SearchContainer>
        <SearchSmallContainer>
          <SearchIcon icon={faMagnifyingGlass} />
          <SearchInput
            type="text"
            value={query}
            onChange={handleInputSearch}
            placeholder="검색하기"
            onKeyPress={handleKeyPress}
          ></SearchInput>
        </SearchSmallContainer>
        {query.length > 0 && showSuggestions && (
          <AutoSearchContainer>
            {suggestions.map((result) => (
              <EachDataDiv>
                <EachStockDataDiv>
                  <EachStockIcon src={NaverIcon}></EachStockIcon>
                  <AutoSearchData>{result.prdt_name}</AutoSearchData>
                  <EachStockData>주식 설명</EachStockData>
                </EachStockDataDiv>
                <EachPercentDataDiv>
                  <StockPrice>7500</StockPrice>
                  <PercentData>+500 (+5%)</PercentData>
                </EachPercentDataDiv>
              </EachDataDiv>
            ))}
          </AutoSearchContainer>
        )}
        {query.length === 0 && (
          <AutoSearchContainer>
            <RecentSearch>최근 검색 기록</RecentSearch>
            {recentSearchData !== null ? (
              recentSearchData.map((recent) => (
                <EachDataDiv>
                  <EachStockDataDiv>
                    <EachStockIcon src={NaverIcon}></EachStockIcon>
                    <AutoSearchData>{recent}</AutoSearchData>
                    <EachStockData>주식 설명</EachStockData>
                  </EachStockDataDiv>
                  <EachPercentDataDiv>
                    <StockPrice>7500</StockPrice>
                    <PercentData>+500 (+5%)</PercentData>
                  </EachPercentDataDiv>
                </EachDataDiv>
              ))
            ) : (
              <RecentSearch>검색 기록이 없습니다.</RecentSearch>
            )}
          </AutoSearchContainer>
        )}
      </SearchContainer>
    </>
  );
};

export default SearchBar;
