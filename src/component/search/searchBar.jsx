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

  { prdt_name: "애플", code: "AAPL" },
  { prdt_name: "마이크로소프트", code: "MSFT" },
  { prdt_name: "아마존닷컴", code: "AMZN" },
  { prdt_name: "엔비디아", code: "NVDA" },
  { prdt_name: "알파벳 A", code: "GOOGL" },
  { prdt_name: "알파벳 C", code: "GOOG" },
  { prdt_name: "테슬라", code: "TSLA" },
  { prdt_name: "메타 플랫폼스(페이스북)", code: "META" },
  { prdt_name: "ASML 홀딩(ADR)", code: "ASML" },
  { prdt_name: "펩시코", code: "PEP" },
  { prdt_name: "어도비", code: "ADBE" },
  { prdt_name: "시스코 시스템즈", code: "CSCO" },
  { prdt_name: "아스트라제네카(ADR)", code: "AZN" },
  { prdt_name: "INVESCO QQQ TRUST UNIT SER 1", code: "QQQ" },
  { prdt_name: "넷플릭스", code: "NFLX" },
  { prdt_name: "AMD", code: "AMD" },
  { prdt_name: "T 모바일 US", code: "TMUS" },
  { prdt_name: "텍사스 인스트루먼츠", code: "TXN" },
  { prdt_name: "인텔", code: "INTC" },
  { prdt_name: "인튜이트", code: "INTU" },
  { prdt_name: "퀄컴", code: "QCOM" },
  { prdt_name: "어플라이드 머티어리얼즈", code: "AMAT" },
  { prdt_name: "스타벅스", code: "SBUX" },
  { prdt_name: "인튜이티브 서지컬", code: "ISRG" },
  { prdt_name: "핀둬둬(ADR)", code: "PDD" },
  { prdt_name: "길리어드 사이언스", code: "GILD" },
  { prdt_name: "애널로그 디바이시스", code: "ADI" },
  { prdt_name: "마이크론 테크놀로지", code: "MU" },
  { prdt_name: "팰로 앨토 네트웍스", code: "PANW" },
  { prdt_name: "페이팔 홀딩스", code: "PYPL" },
  { prdt_name: "넷이즈(ADR)", code: "NTES" },
  { prdt_name: "케이던스 디자인 시스템", code: "CDNS" },
  { prdt_name: "에어비앤비", code: "ABNB" },
  { prdt_name: "징동닷컴(ADR)", code: "JD" },
  { prdt_name: "룰루레몬 애슬레티카", code: "LULU" },
  { prdt_name: "포티넷", code: "FTNT" },
  { prdt_name: "코파트", code: "CPRT" },
  { prdt_name: "크래프트 하인즈", code: "KHC" },
  { prdt_name: "엑셀론", code: "EXC" },
  { prdt_name: "ISHARES 20+Y TREASURY BOND ETF", code: "TLT" },
  { prdt_name: "모더나", code: "MRNA" },
  { prdt_name: "바이두(ADR)", code: "BIDU" },
  { prdt_name: "트레이드 데스크", code: "TTD" },
  { prdt_name: "워너 브로스 디스커버리", code: "WBD" },
  { prdt_name: "리 오토(ADR)", code: "LI" },
  { prdt_name: "아제닉스(ADR)", code: "ARGX" },
  { prdt_name: "ISHARES 7-10Y TREASURY BOND ETF", code: "IEF" },
  { prdt_name: "데이터도그", code: "DDOG" },
  { prdt_name: "다이아몬드백 에너지", code: "FANG" },
  { prdt_name: "트립닷컴 그룹(ADR)", code: "TCOM" },
  { prdt_name: "앤시스", code: "ANSS" },
  { prdt_name: "바이오엔테크(ADR)", code: "BNTX" },
  { prdt_name: "나스닥", code: "NDAQ" },
  { prdt_name: "보다폰 그룹(ADR)", code: "VOD" },
  { prdt_name: "퍼스트 솔라", code: "FSLR" },
  { prdt_name: "베리사인", code: "VRSN" },
  { prdt_name: "지스케일러", code: "ZS" },
  { prdt_name: "ISHARES SHORT TREASURY BOND ETF", code: "SHV" },
  { prdt_name: "리비안 오토모티브", code: "RIVN" },
  { prdt_name: "인페이즈 에너지", code: "ENPH" },
  { prdt_name: "PROETF ULTRAPRO QQQ", code: "TQQQ" },
  { prdt_name: "스틸 다이내믹스", code: "STLD" },
  { prdt_name: "줌 비디오 커뮤니케이션스", code: "ZM" },
  { prdt_name: "코인베이스 글로벌", code: "COIN" },
  { prdt_name: "에릭슨 B(ADR)", code: "ERIC" },
  { prdt_name: "루시드 그룹", code: "LCID" },
  { prdt_name: "슈퍼 마이크로 컴퓨터", code: "SMCI" },
  { prdt_name: "INVESCO NASDAQ 100 ETF", code: "QQQM" },
  { prdt_name: "APA", code: "APA" },
  { prdt_name: "비아트리스", code: "VTRS" },
  { prdt_name: "드래프트킹스", code: "DKNG" },
  { prdt_name: "그랩 홀딩스", code: "GRAB" },
  { prdt_name: "아메리칸 에어라인스 그룹", code: "AAL" },
  { prdt_name: "헨리 셰인", code: "HSIC" },
  { prdt_name: "VANECK SEMICONDUCTOR ETF", code: "SMH" },
  { prdt_name: "도큐사인", code: "DOCU" },
  { prdt_name: "솔라엣지 테크놀로지스", code: "SEDG" },
  { prdt_name: "파라마운트 글로벌 B", code: "PARA" },
  { prdt_name: "엣시", code: "ETSY" },
  { prdt_name: "질로우 그룹 C", code: "Z" },
  { prdt_name: "ISHARES SEMICONDUCTOR ETF", code: "SOXX" },
  { prdt_name: "GLOBAL X NASDAQ-100 COVERED CALL ETF", code: "QYLD" },
  { prdt_name: "소파이 테크놀로지스", code: "SOFI" },
  { prdt_name: "먼데이 컴", code: "MNDY" },
  { prdt_name: "ISHARES MSCI CHINA ETF", code: "MCHI" },
  { prdt_name: "크록스", code: "CROX" },
  { prdt_name: "램버스", code: "RMBS" },
  { prdt_name: "AGNC 인베스트먼트", code: "AGNC" },
  { prdt_name: "플러그 파워", code: "PLUG" },
  { prdt_name: "비리비리(ADR)", code: "BILI" },
  { prdt_name: "J.P. MORGAN NASDAQ EQUITY PREMIUM INCOME ETF", code: "JEPQ" },
  { prdt_name: "리프트", code: "LYFT" },
  { prdt_name: "PROETF ULTRAPRO SHORT QQQ", code: "SQQQ" },
  { prdt_name: "푸투 홀딩스(ADR)", code: "FUTU" },
  { prdt_name: "스프라우츠 파머스 마켓", code: "SFM" },
  { prdt_name: "비아샛", code: "VSAT" },
  { prdt_name: "스톤코", code: "STNE" },
  { prdt_name: "ISHARES TRUST GLOBAL CLEAN ENERGY ETF", code: "ICLN" },
  { prdt_name: "선런", code: "RUN" },
  { prdt_name: "인텔리아 테라퓨틱스", code: "NTLA" },
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
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearchData, setRecentSearch] = useState([]);
  const [recentAxios, setRecentAxios] = useState();

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
        setRecentAxios(foundObjects);
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
    async function fetchTransactionRank() {
      try {
        const response = await axios.get(
          "https://stalksound.store/sonification/transaction_rank/"
        );
        if (response.status === 200) {
          const transactionRank = response.data["시가총액 순위"];

          // Loop through transactionRank and update stockList with "현재가" and "전일 대비율"
          transactionRank.slice(0, 100).forEach((item) => {
            const stockIndex = stockList.findIndex(
              (stock) => stock.prdt_name === item["종목명"]
            );
            if (stockIndex !== -1) {
              stockList[stockIndex]["현재가"] = item["현재가"];
              stockList[stockIndex]["전일 대비율"] = item["전일 대비율"];
            }
          });

          // Print or process updated stockList
          stockList.forEach((stock) => {
            console.log("종목명:", stock.prdt_name);
            console.log("현재가:", stock["현재가"]);
            console.log("전일 대비율:", stock["전일 대비율"]);
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchTransactionRank();
  }, []);

  console.log("ㅎㅎ");
  // console.log(rankData);

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
                  <StockPrice>{result.현재가}</StockPrice>
                  <PercentData>{result["전일 대비율"]}</PercentData>
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
                    {/* <EachStockData>주식 설명</EachStockData> */}
                  </EachStockDataDiv>
                  <EachPercentDataDiv>
                    <StockPrice>{7500}</StockPrice>
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
