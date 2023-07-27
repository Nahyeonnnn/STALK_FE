import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {BiSearch} from "@react-icons/all-files/bi/BiSearch"

//axios 연결 시 받을 주식 리스트 예시
//일단은 주식 이름 string이 들어있다고 가정함
const testList = [
    {prdt_name : "애플"},
    {prdt_name : "삼성전자"},
    {prdt_name : "테슬라"},
    {prdt_name : "LG전자"},
    {prdt_name : "삼성생명"},
    {prdt_name : "삼성화재"},
    {prdt_name : "현대모비스"},
    {prdt_name : "아모레퍼시픽"},
    {prdt_name : "LG화학"},
    {prdt_name : "SK하이닉스"},
    {prdt_name : "삼성SDI"},
    {prdt_name : "삼성SDS"}
];

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const SearchSmallContainer = styled.div`
    position: relative;
    span {
        position: absolute;
        left: 0.8rem;
        top: 1.8rem;
    }
`;

const SearchInput = styled.input`
    border: 0;
    background-color: var(--gray, #F9F9F9);
    width: 80vw;
    height: 1.5rem;
    border-radius: 12px;
    padding: 0.625rem 1rem 0.625rem 2rem;
    margin-top: 1rem;
`;

const AutoSearchContainer = styled.div`
  z-index: 3;
  height: 50vh;
  width: 400px;
  background-color: #fff;
  position: absolute;
  top: 45px;
  border: 2px solid;
  padding: 15px;
`;

const AutoSearchWrap = styled.ul`

`;

const AutoSearchData = styled.li`
  padding: 10px 8px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  z-index: 4;
  letter-spacing: 2px;
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
  position: relative;
  img {
    position: absolute;
    right: 5px;
    width: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const SearchBar = () => {

    function handleInputSearch(e){
        setQuery(e.target.value);
        console.log(query);
    }

    function SearchIconClick(){

    }

    //axios 연결 시 주식 리스트를 저장할 변수
    const [stockList, setStockList]=useState(testList);
    //검색어를 저장하기 위한 useState
    const [query, setQuery]=useState("");

    //input 태그에 onchange, onblur, onkeypress 속성 추가

    return (
        <>
        <SearchContainer>
            <SearchSmallContainer>
                <span>
                <BiSearch onClick={SearchIconClick} color='gray'/>
                </span>
                <SearchInput type="text" value={query} onChange={handleInputSearch} placeholder='검색하기'></SearchInput>
            </SearchSmallContainer>
        </SearchContainer>
        <AutoSearchContainer>
            <AutoSearchData>
                
            </AutoSearchData>
        </AutoSearchContainer>
        

        </>
    );
};

export default SearchBar;