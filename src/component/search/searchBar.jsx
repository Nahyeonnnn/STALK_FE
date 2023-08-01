import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import SearchRecent from "./searchRecent";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import NaverIcon from "./NaverIcon.png";

library.add(faMagnifyingGlass);

//axios 연결 시 받을 주식 리스트 예시
//일단은 주식 이름 string이 들어있다고 가정함
const testList = [
  { prdt_name: "애플" },
  { prdt_name: "삼성전자" },
  { prdt_name: "테슬라" },
  { prdt_name: "LG전자" },
  { prdt_name: "삼성생명" },
  { prdt_name: "삼성화재" },
  { prdt_name: "현대모비스" },
  { prdt_name: "아모레퍼시픽" },
  { prdt_name: "LG화학" },
  { prdt_name: "SK하이닉스" },
  { prdt_name: "삼성SDI" },
  { prdt_name: "삼성SDS" },
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
  //axios 연결 시 주식 리스트를 저장할 변수
  const [stockList, setStockList] = useState(testList);
  //검색어를 저장하기 위한 useState
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearchData, setRecentSearch] = useState([]); //최근 검색한 데이터 useState

  function handleInputSearch(e) {
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

  //중간 검색 과정에서의 키워드를 저장하는 함수
  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion.prdt_name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const searchData = (query) => {
    const results = stockList.filter((item) => item.prdt_name.includes(query));
    return results;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      //엔터를 눌렀을 때 실행할 함수
      e.preventDefault();
      console.log("엔터 키 누름!");
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

  // function SearchIconClick(){
  //     axios
  //         .get(``)
  //         .then((res)=>{
  //             setStockList(res.data);
  //         })
  //         .catch((e)=>{
  //             console.log(e);
  //         });
  // }

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
      console.log(recentSearchDataString);
      setRecentSearch(JSON.parse(recentSearchDataString));
    }
  }, []); //처음 렌더링 될 때만 실행되게 함

  //input 태그에 onblur 속성 필요하다면 추가하기

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
