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

const InterSellPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [active, setActive] = useState(0);
  const [inputLength, setInputLength] = useState(0); // State to keep track of input length
  const [TotalAmountStockPrice, setTotalAmountStockPrice] = useState(0);
  const [stockPrice, setStockPrice] = useState(0);
  //axios 연결 시 받을 주식 리스트 예시
  const stockList = [
    // 미국 주식 추가
    { prdt_name: "아미리스", code: "AMRS" },
    { prdt_name: "WeWork", code: "WE" },
    { prdt_name: "Marketing Worldwide", code: "MWWC" },
    { prdt_name: "Humbl", code: "HMBL" },
    { prdt_name: "Proterra", code: "PTRA" },
    { prdt_name: "Zerify", code: "ZRFY" },
    { prdt_name: "테슬라", code: "TSLA" },
    { prdt_name: "Airspan Networks Holdings", code: "MIMO" },
    { prdt_name: "Cano Health", code: "CANO" },
    { prdt_name: "Drone Guarder", code: "DRNG" },
    { prdt_name: "Ebet Inc", code: "EBET" },
    { prdt_name: "Innerscope Advertising", code: "INND" },
    { prdt_name: "Healthier Choices Management", code: "HCMC" },
    { prdt_name: "PHI Group", code: "PHIL" },
    { prdt_name: "Rigetti Computing", code: "RGTI" },
    { prdt_name: "SFLMaven", code: "SFLM" },
    { prdt_name: "T2 Biosystms Inc", code: "TTOO" },
    { prdt_name: "포드", code: "F" },
    { prdt_name: "Genius", code: "GNS" },
    { prdt_name: "Brewbilt Manufacturing Inc", code: "BBRW" },
    { prdt_name: "팔란티어 테크", code: "PLTR" },
    { prdt_name: "AMD", code: "AMD" },
    { prdt_name: "니오 ADR A", code: "NIO" },
    { prdt_name: "니콜라", code: "NKLA" },
    { prdt_name: "엔비디아", code: "NVDA" },
    { prdt_name: "애플", code: "AAPL" },
    { prdt_name: "IONQ", code: "IONQ" },
    { prdt_name: "브라데스코", code: "BBD" },
    { prdt_name: "BioAdaptives", code: "BDPT" },
    { prdt_name: "Cbd Denver", code: "CBDD" },
    { prdt_name: "멀른 오토모티브", code: "MULN" },
    { prdt_name: "Galaxy Next", code: "GAXY" },
    { prdt_name: "아이디어노믹스", code: "IDEX" },
    { prdt_name: "Kenvue", code: "KVUE" },
    { prdt_name: "존슨앤존슨", code: "JNJ" },
    { prdt_name: "Santo Mining Corp", code: "SANP" },
    { prdt_name: "아마존닷컴", code: "AMZN" },
    { prdt_name: "Archer Aviation", code: "ACHR" },
    { prdt_name: "Golden Develop", code: "DVLP" },
    { prdt_name: "뱅크오브아메리카", code: "BAC" },
    { prdt_name: "China Crescent", code: "CCTR" },
    { prdt_name: "MMEX Resources", code: "MMEX" },
    { prdt_name: "AT&T", code: "T" },
    { prdt_name: "리비안", code: "RIVN" },
    { prdt_name: "Artificial Intelligence Tech", code: "AITX" },
    { prdt_name: "Medical Prop Tr", code: "MPW" },
    { prdt_name: "Nouveau Life Pharma", code: "NOUV" },
    { prdt_name: "인텔", code: "INTC" },
    { prdt_name: "Pagaya", code: "PGY" },
    { prdt_name: "플러그파워", code: "PLUG" },
    { prdt_name: "Therapeutic Solutions", code: "TSOI" },
    { prdt_name: "발레 SA ADR", code: "VALE" },
    { prdt_name: "SoFi Technologies", code: "SOFI" },
    { prdt_name: "루시드", code: "LCID" },
    { prdt_name: "Faraday Future Intelligent Electric", code: "FFIE" },
    { prdt_name: "카니발", code: "CCL" },
    { prdt_name: "Tivic Health Systems", code: "TIVC" },
    { prdt_name: "Indoor Harvest", code: "INQD" },
    { prdt_name: "Auto Dataflow", code: "EPAZ" },
    { prdt_name: "알리바바 ADR", code: "BABA" },
    { prdt_name: "AMC 엔터", code: "AMC" },
    { prdt_name: "bowmo", code: "BOMO" },
    { prdt_name: "카누", code: "GOEV" },
    { prdt_name: "Ijj Corporation", code: "IJJP" },
    { prdt_name: "Telesat", code: "TSAT" },
    { prdt_name: "마이크로소프트", code: "MSFT" },
    { prdt_name: "마라톤 디지털", code: "MARA" },
    { prdt_name: "월트 디즈니", code: "DIS" },
    { prdt_name: "Tilray", code: "TLRY" },
    { prdt_name: "드래프트킹스", code: "DKNG" },
    { prdt_name: "Marijuana America", code: "MCOA" },
    { prdt_name: "Canopy Growth", code: "CGC" },
    { prdt_name: "제너럴 모터스", code: "GM" },
    { prdt_name: "LYFT", code: "LYFT" },
    { prdt_name: "Ginkgo Bioworks", code: "DNA" },
    { prdt_name: "알파벳 A", code: "GOOGL" },
    { prdt_name: "CarbonMeta Tech", code: "COWI" },
    { prdt_name: "Metatron", code: "MRNJ" },
    { prdt_name: "펜 엔터테인먼트", code: "PENN" },
    { prdt_name: "페트로브라스", code: "PBR" },
    { prdt_name: "PG E", code: "PCG" },
    { prdt_name: "사우스웨스턴 에너지", code: "SWN" },
    { prdt_name: "Origin Materials", code: "ORGN" },
    { prdt_name: "Virgin Galactic Holdings", code: "SPCE" },
    { prdt_name: "Riot Platforms", code: "RIOT" },
    { prdt_name: "그랩", code: "GRAB" },
    { prdt_name: "Crown Electrokinetics", code: "CRKN" },
    { prdt_name: "옥시덴탈", code: "OXY" },
    { prdt_name: "화이자", code: "PFE" },
    { prdt_name: "GZ6G Tech", code: "GZIC" },
    { prdt_name: "우버 테크놀로지스", code: "UBER" },
    { prdt_name: "Net Savings Link", code: "NSAV" },
    { prdt_name: "Two Hands", code: "TWOH" },
    { prdt_name: "Integrated Cannabis Solutions", code: "IGPK" },
    { prdt_name: "아메리칸항공그룹", code: "AAL" },
    { prdt_name: "아펠리스", code: "APLS" },
    { prdt_name: "CleanSpark", code: "CLSK" },
    { prdt_name: "트랜스오션", code: "RIG" },
    { prdt_name: "루멘 테크놀로지스", code: "LUMN" },
    { prdt_name: "Eton Pharmaceuticals", code: "ETON" },
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

  const 예약판매버튼 = async () => {
    try {
      const response = await axios.post(
        "https://stalksound.store/sonification/sell/",
        {
          stock_symbol: StockID6,
          quantity: parseInt(inputValue)
        }
      );

      if (response.status === 200) {
        navigate("/sell/confirm");
      } else {
        // 에러 상황 처리
      }
    } catch (error) {
      console.error("매도 중 오류 발생:", error);
      // 에러 상황 처리
    }
  };
  const { StockID6 } = useParams();
  const stock = stockList.find((item) => item.code === StockID6);

  console.log(StockID6);
  console.log(stock);

  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://stalksound.store/sonification/f_now_data/",
          {
            params: {
              symbol: StockID6,
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
  console.log("nowPrice : " + nowPrice);
  console.log("stockData : " + stockData);

  return (
    <>
      <TopBar></TopBar>
      <StockName>{stock.prdt_name}</StockName>
      <PriceBox>
        <PriceBoxLeft>판매할 가격</PriceBoxLeft>
        <PriceBoxRight>{nowPrice} \</PriceBoxRight>
      </PriceBox>
      <PurchastText>몇 주를 판매할까요?</PurchastText>
      <FormContainer>
        <PurchaseBox
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => setActive(1)}
        ></PurchaseBox>
        <PurchaseConfirm onClick={handleConfirmClick}>확인</PurchaseConfirm>
      </FormContainer>
      <TotalAmountBox>total {TotalAmountStockPriceDisplay} \</TotalAmountBox>
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
          <ReserveLine1> {stock.prdt_name} {inputValue}주 판매 예약</ReserveLine1>
          <ReserveLine2>
            <div> 1주 희망 가격 </div> <div> {nowPrice} \</div>
          </ReserveLine2>
          <ReserveLine3>
            <div> 예상 수수료 </div> <div> {}0 \</div>
          </ReserveLine3>
          <ReserveLine4>
            <div> 총 매도 금액 </div>{" "}
            <div> {TotalAmountStockPriceDisplay} \</div>
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
              <ReserveConfirmBtn onClick={예약판매버튼}>
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

export default InterSellPage;
