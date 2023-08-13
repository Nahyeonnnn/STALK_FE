import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BottomBar from "../component/global/bottomBar";
import TopBar from "../component/global/topBar";
import { useParams } from "react-router-dom";
import axios from "axios";

const StockName = styled.div`
  display: flex;
  color: white;
  font-weight: bold;
  width: 90vw;
  height: 13vh;
  margin: auto;
  align-items: flex-end;
  font-size: larger;
`;

const PriceBox = styled.div`
  display: flex;
  color: white;
  margin-top: 1.5rem;
  justify-content: space-around;
`;

const PriceBoxLeft = styled.div`
  color: lightgray;
`;

const PriceBoxRight = styled.div`
  color: white;
`;

const PurchastText = styled.div`
  color: white;
  margin-top: 3rem;
  margin-left: 2rem;
  font-weight: bold;
`;

const FormContainer = styled.div`
  display: flex;
  width: 70vw;
  margin: auto;
  margin-top: 1.5rem;
  background-color: #f1d00a;
  border-radius: 2rem;
  height: auto;
`;

const PurchaseBox = styled.input`
  display: flex;
  background-color: #f1d00a;
  opacity: 0.85;
  border-radius: 2rem;
  width: 45vw;
  height: 4vh;
  margin: auto;
  padding: 1rem 0 1rem 1rem;
  border-style: none;
  &:focus {
    outline: none;
  }
  font-size: 1.5rem;
`;

const PurchaseConfirm = styled.button`
  color: black;
  font-weight: bold;
  align-self: center;
  border: none;
  background: none;
  padding: 0.5rem;
  width: 5rem;
  white-space: nowrap;
  font-size: 1rem;
  cursor: pointer;
`;

const TotalAmountBox = styled.div`
  display: flex;
  justify-content: flex-end;
  color: white;
  /* background-color: coral; */
  width: 70vw;
  font-size: 1.5rem;
  height: auto;
  margin: auto;
  margin-top: 1rem;
`;

const NumberBox = styled.div`
  background-color: #f1d00a;
  width: 100vw;
  height: 40vh;
  display: flex;
  position: fixed;
  bottom: 2rem;
  margin: auto;
  border-radius: 1rem;
  justify-content: space-around;
  flex-direction: column;
  z-index: 3;
`;
const ThreeNumberBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
`;

const LastNumberBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const NumberEach = styled.button`
  font-size: 2rem;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0);
  border: 0rem;
  cursor: pointer;
`;

const TextEach = styled.button`
  font-size: 1rem;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0);
  border: 0rem;
  margin-left: -1rem;
  margin-right: -1rem;
`;

const ReserveLine1 = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  width: 90vw;
  height: 6vh;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ReserveLine2 = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: auto;
  width: 85vw;
  height: 3vh;
  font-size: 1.1rem;
  font-weight: bold;
`;

const ReserveLine3 = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: auto;
  width: 85vw;
  height: 3vh;
  font-size: 1.1rem;
  font-weight: bold;
`;

const ReserveLine4 = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: auto;
  width: 85vw;
  height: 3vh;
  font-size: 1.1rem;
  font-weight: bold;
`;

const ReserveLine5 = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  margin: auto;
  margin-bottom: 1.5rem;
  width: 90vw;
  height: 6vh;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ReserveCancleBtn = styled.button`
  width: 9rem;
  height: 2.5rem;
  background-color: #b6b6b6;
  border-style: none;
  border-radius: 0.5rem;
  font-weight: bolder;
  font-size: 1rem;
  color: #2b50f6;
  cursor: pointer;
`;

const ReserveConfirmBtn = styled.button`
  width: 9rem;
  height: 2.5rem;
  background-color: #2b50f6;
  border-style: none;
  border-radius: 0.5rem;
  font-weight: bolder;
  font-size: 1rem;
  color: white;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 검은색으로 반투명
  z-index: 1; // 다른 요소들보다 위에 위치
  display: ${(props) =>
    props.active ? "block" : "none"}; // active 상태에 따라 표시
`;

const BuyPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [active, setActive] = useState(0);
  const [inputLength, setInputLength] = useState(0); // State to keep track of input length
  const [TotalAmountStockPrice, setTotalAmountStockPrice] = useState(0);
  const [stockPrice, setStockPrice] = useState(0);

  //axios 연결 시 받을 주식 리스트 예시
  const stockList = [
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

  const addDigit = (digit) => {
    setInputValue((prevValue) => {
      const newValue = prevValue + digit;
      setTotalAmountStockPrice(newValue * stockPrice); // Update the total amount when input changes
      return newValue;
    });
    setInputLength((prevLength) => prevLength + 1);
  };

  const removeDigit = () => {
    setInputValue((prevValue) => {
      const newValue = prevValue.slice(0, -1);
      setTotalAmountStockPrice(newValue * stockPrice); // Update the total amount when input changes
      return newValue;
    });
    setInputLength((prevLength) => prevLength - 1);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setTotalAmountStockPrice(event.target.value * stockPrice); // Update the total amount when input changes
  };

  //const StockPriceWithoutComma = 70500;
  // const StockPrice = StockPriceWithoutComma.toLocaleString("ko-KR"); //세자리수마다 콤마찍기

  // Convert the TotalAmountStockPrice back to a string with commas for displaying
  const TotalAmountStockPriceDisplay =
    TotalAmountStockPrice.toLocaleString("ko-KR");

  const [confirmation, setConfirmation] = useState(false); // New state for the confirmation message

  const handleConfirmClick = () => {
    setActive(0);
    setConfirmation(true); // Set the confirmation to true when the confirm button is clicked
  };

  const navigate = useNavigate();

  const 예약구매버튼 = () => {
    navigate("/buy/confirm");
  };

  const { StockID2 } = useParams();
  const stock = stockList.find((item) => item.code === StockID2);

  console.log(StockID2);
  console.log(stock);

  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://stalksound.store/sonification/now_data/",
          {
            params: {
              symbol: StockID2,
            },
          }
        );
        setStockData(Number(response.data.chart_data.현재가));
        setStockPrice(response.data.chart_data.현재가);
        console.log(response.data);
        console.log(response.data.chart_data.현재가);
      } catch (error) {
        console.error("종목명 가져오기 실패 ", error);
      }
    };

    fetchData();
  }, []);

  const nowPrice = stockData.toLocaleString("ko-KR"); //세자리수마다 콤마찍기
  console.log("nowPrice" + nowPrice);
  console.log("stockData" + stockData);
  return (
    <>
      <TopBar></TopBar>
      <StockName>{stock.prdt_name}</StockName>
      <PriceBox>
        <PriceBoxLeft>구매할 가격</PriceBoxLeft>
        <PriceBoxRight>{nowPrice}원</PriceBoxRight>
      </PriceBox>
      <PurchastText>몇 주를 구매할까요?</PurchastText>
      <FormContainer>
        <PurchaseBox
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => setActive(1)}
        ></PurchaseBox>
        <PurchaseConfirm onClick={handleConfirmClick}>확인</PurchaseConfirm>
      </FormContainer>
      <TotalAmountBox>총 {TotalAmountStockPriceDisplay}원</TotalAmountBox>
      {active === 1 && (
        <NumberBox>
          <ThreeNumberBox>
            <NumberEach onClick={() => addDigit(1)}>1</NumberEach>
            <NumberEach onClick={() => addDigit(2)}>2</NumberEach>
            <NumberEach onClick={() => addDigit(3)}>3</NumberEach>
          </ThreeNumberBox>
          <ThreeNumberBox>
            <NumberEach onClick={() => addDigit(4)}>4</NumberEach>
            <NumberEach onClick={() => addDigit(5)}>5</NumberEach>
            <NumberEach onClick={() => addDigit(6)}>6</NumberEach>
          </ThreeNumberBox>
          <ThreeNumberBox>
            <NumberEach onClick={() => addDigit(7)}>7</NumberEach>
            <NumberEach onClick={() => addDigit(8)}>8</NumberEach>
            <NumberEach onClick={() => addDigit(9)}>9</NumberEach>
          </ThreeNumberBox>
          <LastNumberBox>
            <TextEach
              onClick={() => {
                setInputValue("");
                setTotalAmountStockPrice(0);
              }}
            >
              전체삭제
            </TextEach>
            <NumberEach onClick={() => addDigit(0)}>0</NumberEach>
            <NumberEach onClick={() => removeDigit()}>⬅</NumberEach>
          </LastNumberBox>
        </NumberBox>
      )}

      <Overlay active={confirmation}></Overlay>
      {confirmation && (
        <NumberBox>
          <ReserveLine1> {stock.prdt_name} {inputValue}주 구매 예약</ReserveLine1>
          <ReserveLine2>
            <div> 1주 희망 가격 </div> <div> {nowPrice}원</div>
          </ReserveLine2>
          <ReserveLine3>
            <div> 예상 수수료 </div> <div> {}0원</div>
          </ReserveLine3>
          <ReserveLine4>
            <div> 총 주문 금액 </div>{" "}
            <div> {TotalAmountStockPriceDisplay}원</div>
          </ReserveLine4>
          <ReserveLine5>
            <div>
              {" "}
              <ReserveCancleBtn
                onClick={() => {
                  setActive(1);
                  setConfirmation(false);
                }}
              >
                취소
              </ReserveCancleBtn>{" "}
            </div>{" "}
            <div>
              {" "}
              <ReserveConfirmBtn onClick={예약구매버튼}>
                확인
              </ReserveConfirmBtn>{" "}
            </div>
          </ReserveLine5>
        </NumberBox>
      )}
      <BottomBar></BottomBar>
    </>
  );
};

export default BuyPage;
