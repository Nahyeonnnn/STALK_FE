import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import NaverIcon from "./NaverIcon.png";
import AudioRecord from "./audioRecord";

library.add(faMagnifyingGlass);

function isUSStock(code) {
  const usStockCodes = [
    "AMRS",
    "WE",
    "MWWC",
    "HMBL",
    "PTRA",
    "ZRFY",
    "TSLA",
    "MIMO",
    "CANO",
    "DRNG",
    "EBET",
    "INND",
    "HCMC",
    "PHIL",
    "RGTI",
    "SFLM",
    "TTOO",
    "F",
    "GNS",
    "BBRW",
    "PLTR",
    "AMD",
    "NIO",
    "NKLA",
    "NVDA",
    "AAPL",
    "IONQ",
    "BBD",
    "BDPT",
    "CBDD",
    "MULN",
    "GAXY",
    "IDEX",
    "KVUE",
    "JNJ",
    "SANP",
    "AMZN",
    "ACHR",
    "DVLP",
    "BAC",
    "CCTR",
    "MMEX",
    "T",
    "RIVN",
    "AITX",
    "MPW",
    "NOUV",
    "INTC",
    "PGY",
    "PLUG",
    "TSOI",
    "VALE",
    "SOFI",
    "LCID",
    "FFIE",
    "CCL",
    "TIVC",
    "INQD",
    "EPAZ",
    "BABA",
    "AMC",
    "BOMO",
    "GOEV",
    "IJJP",
    "TSAT",
    "MSFT",
    "MARA",
    "DIS",
    "TLRY",
    "DKNG",
    "MCOA",
    "CGC",
    "GM",
    "LYFT",
    "DNA",
    "GOOGL",
    "COWI",
    "MRNJ",
    "PENN",
    "PBR",
    "PCG",
    "SWN",
    "ORGN",
    "SPCE",
    "RIOT",
    "GRAB",
    "CRKN",
    "OXY",
    "PFE",
    "GZIC",
    "UBER",
    "NSAV",
    "TWOH",
    "IGPK",
    "AAL",
    "APLS",
    "CLSK",
    "RIG",
    "LUMN",
    "ETON",
  ];

  return usStockCodes.includes(code);
}

//axios 연결 시 받을 주식 리스트 예시
export const stockList = [
  { prdt_name: "삼성전자", code: "005930" },
  { prdt_name: "LG에너지솔루션", code: "373220" },
  { prdt_name: "SK하이닉스", code: "000660" },
  { prdt_name: "삼성바이오로직스", code: "207940" },
  { prdt_name: "POSCO홀딩스", code: "005490" },
  { prdt_name: "삼성전자우", code: "005935" },
  { prdt_name: "삼성SDI", code: "006400" },
  { prdt_name: "LG화학", code: "051910" },
  { prdt_name: "현대차", code: "005380" },
  { prdt_name: "NAVER", code: "035420" },
  { prdt_name: "포스코퓨처엠", code: "003670" },
  { prdt_name: "기아", code: "000270" },
  { prdt_name: "에코프로비엠", code: "247540" },
  { prdt_name: "에코프로", code: "086520" },
  { prdt_name: "카카오", code: "035720" },
  { prdt_name: "현대모비스", code: "012330" },
  { prdt_name: "셀트리온", code: "068270" },
  { prdt_name: "KB금융", code: "105560" },
  { prdt_name: "삼성물산", code: "028260" },
  { prdt_name: "신한지주", code: "055550" },
  { prdt_name: "SK이노베이션", code: "096770" },
  { prdt_name: "LG전자", code: "066570" },
  { prdt_name: "포스코인터내셔널", code: "047050" },
  { prdt_name: "삼성생명", code: "032830" },
  { prdt_name: "LG", code: "003550" },
  { prdt_name: "카카오뱅크", code: "323410" },
  { prdt_name: "삼성화재", code: "000810" },
  { prdt_name: "한국전력", code: "015760" },
  { prdt_name: "KT&G", code: "033780" },
  { prdt_name: "하나금융지주", code: "086790" },
  { prdt_name: "HD현대중공업", code: "329180" },
  { prdt_name: "삼성전기", code: "009150" },
  { prdt_name: "셀트리온헬스케어", code: "091990" },
  { prdt_name: "SK", code: "034730" },
  { prdt_name: "삼성에스디에스", code: "018260" },
  { prdt_name: "두산에너빌리티", code: "034020" },
  { prdt_name: "SK텔레콤", code: "017670" },
  { prdt_name: "메리츠금융지주", code: "138040" },
  { prdt_name: "하이브", code: "352820" },
  { prdt_name: "고려아연", code: "010130" },
  { prdt_name: "대한항공", code: "003490" },
  { prdt_name: "한화오션", code: "042660" },
  { prdt_name: "KT", code: "030200" },
  { prdt_name: "HMM", code: "011200" },
  { prdt_name: "기업은행", code: "024110" },
  { prdt_name: "S-Oil", code: "010950" },
  { prdt_name: "우리금융지주", code: "316140" },
  { prdt_name: "HD한국조선해양", code: "009540" },
  { prdt_name: "엘앤에프", code: "066970" },
  { prdt_name: "크래프톤", code: "259960" },
  { prdt_name: "삼성중공업", code: "010140" },
  { prdt_name: "아모레퍼시픽", code: "090430" },
  { prdt_name: "SK바이오팜", code: "326030" },
  { prdt_name: "LG생활건강", code: "051900" },
  { prdt_name: "삼성엔지니어링", code: "028050" },
  { prdt_name: "금양", code: "001570" },
  { prdt_name: "SK아이이테크놀로지", code: "361610" },
  { prdt_name: "SK스퀘어", code: "402340" },
  { prdt_name: "현대글로비스", code: "086280" },
  { prdt_name: "카카오페이", code: "377300" },
  { prdt_name: "SK바이오사이언스", code: "302440" },
  { prdt_name: "한화솔루션", code: "009830" },
  { prdt_name: "LG이노텍", code: "011070" },
  { prdt_name: "KODEX 200", code: "069500" },
  { prdt_name: "유한양행", code: "000100" },
  { prdt_name: "롯데케미칼", code: "011170" },
  { prdt_name: "엔씨소프트", code: "036570" },
  { prdt_name: "DB손해보험", code: "005830" },
  { prdt_name: "한화에어로스페이스", code: "012450" },
  { prdt_name: "두산밥캣", code: "241560" },
  { prdt_name: "TIGER CD금리투자KIS(", code: "357870" },
  { prdt_name: "한온시스템", code: "018880" },
  { prdt_name: "맥쿼리인프라", code: "088980" },
  { prdt_name: "한국타이어앤테크놀로", code: "161390" },
  { prdt_name: "오리온", code: "271560" },
  { prdt_name: "LG디스플레이", code: "034220" },
  { prdt_name: "한미반도체", code: "042700" },
  { prdt_name: "HD현대", code: "267250" },
  { prdt_name: "CJ제일제당", code: "097950" },
  { prdt_name: "현대제철", code: "004020" },
  { prdt_name: "코스모신소재", code: "005070" },
  { prdt_name: "한국항공우주", code: "047810" },
  { prdt_name: "LG유플러스", code: "032640" },
  { prdt_name: "포스코DX", code: "022100" },
  { prdt_name: "현대오토에버", code: "307950" },
  { prdt_name: "F&F", code: "383220" },
  { prdt_name: "JYP Ent.", code: "035900" },
  { prdt_name: "미래에셋증권", code: "006800" },
  { prdt_name: "넷마블", code: "251270" },
  { prdt_name: "한미약품", code: "128940" },
  { prdt_name: "LS", code: "006260" },
  { prdt_name: "현대건설", code: "000720" },
  { prdt_name: "HLB", code: "028300" },
  { prdt_name: "현대차2우B", code: "005387" },
  { prdt_name: "SKC", code: "011790" },
  { prdt_name: "펄어비스", code: "263750" },
  { prdt_name: "호텔신라", code: "008770" },
  { prdt_name: "GS", code: "078930" },
  { prdt_name: "현대미포조선", code: "010620" },
  { prdt_name: "KODEX KOFR금리액티브", code: "423160" },

  //미국 주식 추가

  {
    prdt_name: "애플",
    code: "AAPL",
  },
  {
    prdt_name: "마이크로소프트",
    code: "MSFT",
  },
  {
    prdt_name: "아마존닷컴",
    code: "AMZN",
  },
  {
    prdt_name: "엔비디아",
    code: "NVDA",
  },
  {
    prdt_name: "알파벳 A",
    code: "GOOGL",
  },
  {
    prdt_name: "알파벳 C",
    code: "GOOG",
  },
  {
    prdt_name: "테슬라",
    code: "TSLA",
  },
  {
    prdt_name: "메타 플랫폼스(페이스북)",
    code: "META",
  },
  {
    prdt_name: "브로드컴",
    code: "AVGO",
  },
  {
    prdt_name: "ASML 홀딩(ADR)",
    code: "ASML",
  },
  {
    prdt_name: "펩시코",
    code: "PEP",
  },
  {
    prdt_name: "코스트코 홀세일",
    code: "COST",
  },
  {
    prdt_name: "어도비",
    code: "ADBE",
  },
  {
    prdt_name: "시스코 시스템즈",
    code: "CSCO",
  },
  {
    prdt_name: "아스트라제네카(ADR)",
    code: "AZN",
  },
  {
    prdt_name: "INVESCO QQQ TRUST UNIT SER 1",
    code: "QQQ",
  },
  {
    prdt_name: "컴캐스트",
    code: "CMCSA",
  },
  {
    prdt_name: "넷플릭스",
    code: "NFLX",
  },
  {
    prdt_name: "AMD",
    code: "AMD",
  },
  {
    prdt_name: "T 모바일 US",
    code: "TMUS",
  },
  {
    prdt_name: "텍사스 인스트루먼츠",
    code: "TXN",
  },
  {
    prdt_name: "인텔",
    code: "INTC",
  },
  {
    prdt_name: "암젠",
    code: "AMGN",
  },
  {
    prdt_name: "인튜이트",
    code: "INTU",
  },
  {
    prdt_name: "사노피(ADR)",
    code: "SNY",
  },
  {
    prdt_name: "허니웰 인터내셔널",
    code: "HON",
  },
  {
    prdt_name: "퀄컴",
    code: "QCOM",
  },
  {
    prdt_name: "어플라이드 머티어리얼즈",
    code: "AMAT",
  },
  {
    prdt_name: "부킹 홀딩스",
    code: "BKNG",
  },
  {
    prdt_name: "스타벅스",
    code: "SBUX",
  },
  {
    prdt_name: "핀둬둬(ADR)",
    code: "PDD",
  },
  {
    prdt_name: "몬덜리즈 인터내셔널",
    code: "MDLZ",
  },
  {
    prdt_name: "길리어드 사이언스",
    code: "GILD",
  },
  {
    prdt_name: "버텍스 파머슈티컬",
    code: "VRTX",
  },
  {
    prdt_name: "램 리서치",
    code: "LRCX",
  },
  {
    prdt_name: "리제네론 파머슈티컬스",
    code: "REGN",
  },
  {
    prdt_name: "액티비전 블리자드",
    code: "ATVI",
  },
  {
    prdt_name: "마이크론 테크놀로지",
    code: "MU",
  },
  {
    prdt_name: "시놉시스",
    code: "SNPS",
  },
  {
    prdt_name: "넷이즈(ADR)",
    code: "NTES",
  },
  {
    prdt_name: "팰로 앨토 네트웍스",
    code: "PANW",
  },
  {
    prdt_name: "KLA",
    code: "KLAC",
  },
  {
    prdt_name: "페이팔 홀딩스",
    code: "PYPL",
  },
  {
    prdt_name: "메르카도리브레",
    code: "MELI",
  },
  {
    prdt_name: "몬스터 베버리지",
    code: "MNST",
  },
  {
    prdt_name: "케이던스 디자인 시스템",
    code: "CDNS",
  },
  {
    prdt_name: "VANGUARD TOTAL INTERNATIONAL STOCK ETF",
    code: "VXUS",
  },
  {
    prdt_name: "에어비앤비",
    code: "ABNB",
  },
  {
    prdt_name: "NXP 세미컨덕터스",
    code: "NXPI",
  },
  {
    prdt_name: "마블 테크놀로지 그룹",
    code: "MRVL",
  },
  {
    prdt_name: "워크데이",
    code: "WDAY",
  },
  {
    prdt_name: "징동닷컴(ADR)",
    code: "JD",
  },
  {
    prdt_name: "큐리그 닥터 페퍼",
    code: "KDP",
  },
  {
    prdt_name: "룰루레몬 애슬레티카",
    code: "LULU",
  },
  {
    prdt_name: "포티넷",
    code: "FTNT",
  },
  {
    prdt_name: "마이크로칩 테크놀로지",
    code: "MCHP",
  },
  {
    prdt_name: "코파트",
    code: "CPRT",
  },
  {
    prdt_name: "크래프트 하인즈",
    code: "KHC",
  },
  {
    prdt_name: "로스 스토어스",
    code: "ROST",
  },
  {
    prdt_name: "엑셀론",
    code: "EXC",
  },
  {
    prdt_name: "온 세미컨덕터",
    code: "ON",
  },
  {
    prdt_name: "ISHARES 20+Y TREASURY BOND ETF",
    code: "TLT",
  },
  {
    prdt_name: "모더나",
    code: "MRNA",
  },
  {
    prdt_name: "바이두(ADR)",
    code: "BIDU",
  },
  {
    prdt_name: "베이커 휴즈",
    code: "BKR",
  },
  {
    prdt_name: "리 오토(ADR)",
    code: "LI",
  },
  {
    prdt_name: "크라우드스트라이크 홀딩스",
    code: "CRWD",
  },
  {
    prdt_name: "트레이드 데스크",
    code: "TTD",
  },
  {
    prdt_name: "일렉트로닉 아츠",
    code: "EA",
  },
  {
    prdt_name: "워너 브로스 디스커버리",
    code: "WBD",
  },
  {
    prdt_name: "엑셀 에너지",
    code: "XEL",
  },
  {
    prdt_name: "아제닉스(ADR)",
    code: "ARGX",
  },
  {
    prdt_name: "코카콜라 유로퍼시픽 파트너스",
    code: "CCEP",
  },
  {
    prdt_name: "ISHARES 7-10Y TREASURY BOND ETF",
    code: "IEF",
  },
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
  &:hover {
    cursor: pointer;
  }
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
  max-width: 60vw;
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
  &:hover {
    cursor: pointer;
  }
`;

const EachStockDataDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1000;
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
  color: ${props => (props.isPositive ? 'red' : 'skyblue')}; 
`;

const RecentSearch = styled.p`
  color: white;
  font-weight: bold;
  margin: 0;
  padding-top: 1rem;
`;

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearchData, setRecentSearch] = useState([]);
  //const [recentAxios, setRecentAxios] = useState();

  const addToSearchHistory = (item) => {
    let newSearchArray = [...recentSearchData];

    if (newSearchArray.length >= 5) {
      newSearchArray.pop();
    }

    if (!newSearchArray.includes(item)) {
      newSearchArray.unshift(item);
      setRecentSearch(newSearchArray);
      localStorage.setItem("recent", JSON.stringify(newSearchArray));
    }
  };

  function handleInputSearch(e) {
    const { value } = e.target;
    setQuery(value);
    const SearchSuggestions = getSuggestions(value);
    setSuggestions(SearchSuggestions);
    setShowSuggestions(true);
  }

  const getSuggestions = (value) => {
    const filteredSuggestions = stockList.filter((item) =>
      item.prdt_name.includes(value)
    );
    return filteredSuggestions;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInputSearch(e);
    }
  };

  useEffect(() => {
    const recentSearchDataString = localStorage.getItem("recent");

    if (!recentSearchDataString) {
      setRecentSearch([]);
    } else {
      setRecentSearch(JSON.parse(recentSearchDataString));
    }
  }, []);

  useEffect(() => {
    const recentArray = JSON.parse(localStorage.getItem("recent"));
    let filteredArray = [];

    if (recentArray && Array.isArray(recentArray) && recentArray.length > 0) {
      filteredArray = recentArray
        .filter((item) => item !== null && item !== undefined)
        .filter((item) => stockList.some((obj) => obj.prdt_name === item));
    }

    let foundObjects = stockList.filter((item) =>
      filteredArray.includes(item.prdt_name)
    );

    console.log("foundObjects", foundObjects);

    const axiosRequests = foundObjects.map((recentData) => {
      return axios.get(`https://stalksound.store/sonification/now_data/`, {
        params: {
          symbol: `${recentData.code}`,
        },
      });
    });

    console.log(axiosRequests);

    Promise.all(axiosRequests)
      .then((responses) => {
        const responseDataArray = responses.map((res) => res.data.chart_data);
        for (let i = 0; i < foundObjects.length; i++) {
          foundObjects[i].responseData = responseDataArray[i];
        }
        //setRecentAxios(foundObjects);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const sttFunction = (data) => {
    setQuery(data.text);
    const SearchSuggestions = getSuggestions(data.text);
    setSuggestions(SearchSuggestions);
    setShowSuggestions(true);
  };

  useEffect(() => {
    async function fetchData(url, startIndex, endIndex) {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const transactionRank = response.data["시가총액 순위"];
          console.log(response.data)
          // Loop through transactionRank and update stockList with "현재가" and "전일 대비율"
          transactionRank.slice(startIndex, endIndex).forEach((item) => {
            const stockIndex = stockList.findIndex(
              (stock) => stock.prdt_name === item["종목명"]
            );
            if (stockIndex !== -1) {
              stockList[stockIndex]["현재가"] = parseInt(
                item["현재가"]
              ).toLocaleString();
              stockList[stockIndex]["전일 대비율"] = parseFloat(
                item["전일 대비율"]
              );
            }
          });
        }
        stockList.forEach((stock) => {
          console.log("종목명:", stock.prdt_name);
          console.log("현재가:", stock["현재가"]);
          console.log("전일 대비율:", stock["전일 대비율"]);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(
      "https://stalksound.store/sonification/transaction_rank/",
      0,
      500
    );
    fetchData(
      "https://stalksound.store/sonification/f_transaction_rank/",
      0,
      500
    );
  }, []);

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
          />
          <AudioRecord propFunction={sttFunction}></AudioRecord>
        </SearchSmallContainer>
        {query.length > 0 && showSuggestions && (
          <AutoSearchContainer>
            {suggestions.map((result) => (
              <EachDataDiv
                onClick={() => {
                  if (isUSStock(result.code)) {
                    navigate(`/detail/inter/${result.code}`);
                  } else {
                    navigate(`/detail/${result.code}`);
                  }
                  addToSearchHistory(result.prdt_name);
                }}
              >
                <EachStockDataDiv>
                  <EachStockIcon src={NaverIcon} />
                  <AutoSearchData>{result.prdt_name}</AutoSearchData>
                </EachStockDataDiv>
                <EachPercentDataDiv>
                  <StockPrice>{result.현재가}원</StockPrice>
                  <PercentData isPositive={parseFloat(result["전일 대비율"]) >= 0}>
                    {result["전일 대비율"]}%
                  </PercentData>
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
                
                <EachDataDiv
                  onClick={() => {
                    const selectedItem = stockList.find(
                      (item) => item.prdt_name === recent
                    );
                    if (selectedItem) {
                      const detailUrl = isUSStock(selectedItem.code)
                        ? `/detail/inter/${selectedItem.code}`
                        : `/detail/${selectedItem.code}`;

                      navigate(detailUrl);
                      addToSearchHistory(selectedItem.prdt_name);
                    }
                  }}
                >
                  <EachStockDataDiv>
                    <EachStockIcon src={NaverIcon} />
                    <AutoSearchData>{recent}</AutoSearchData>
                  </EachStockDataDiv>
                  <EachPercentDataDiv>
                    <StockPrice>{recent}</StockPrice>
                    <PercentData>500 (+0.5)</PercentData>
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
