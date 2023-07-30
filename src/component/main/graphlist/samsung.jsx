import React, { useEffect } from "react";
import styled from "styled-components";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const SamsungStockBox = styled.div`
  display: flex;
  width: 18rem;
  height: 12rem;
  margin: auto;
  background-color: coral;
`;

const Samsung = () => {
  // 기존의 데이터 코드는 그대로 둡니다...
  var data = {
    response: {
      header: {
        resultCode: "00",
        resultMsg: "NORMAL SERVICE.",
      },
      body: {
        numOfRows: 10, //한 페이지 결과 수
        pageNo: 1, //페이지 번호
        totalCount: 879,
        items: {
          item: [
            {
              basDt: "20230720", //기준일자
              srtnCd: "005930",
              isinCd: "KR7005930003", //삼전의 국제 채권 식별 번호
              itmsNm: "삼성전자", //종목명
              mrktCtg: "KOSPI", //시장구분
              clpr: "71000", //종가
              vs: "-700", //대비 (전일 대비 등락)
              fltRt: "-.98", //등락률(전일 대비 등락에 따른 비율)
              mkp: "71100", //시가
              hipr: "71500", //고가(하루 중 가격의 최고치)
              lopr: "70800", //저가 (하루 중 가격의 최저치)
              trqu: "9732730", //거래량 (체결수량의 누적 합계)
              trPrc: "692487601800", //거래대금 (체결수량 누적 합계)
              lstgStCnt: "5969782550", //종목의 상장 주식 수
              mrktTotAmt: "423854561050000", //시가총액 (종가 상장 주식 수)
            },
            {
              basDt: "20230719",
              srtnCd: "005930",
              isinCd: "KR7005930003",
              itmsNm: "삼성전자",
              mrktCtg: "KOSPI",
              clpr: "71700",
              vs: "-300",
              fltRt: "-.42",
              mkp: "72700",
              hipr: "72800",
              lopr: "71300",
              trqu: "10896412",
              trPrc: "782147498048",
              lstgStCnt: "5969782550",
              mrktTotAmt: "428033408835000",
            },
            {
              basDt: "20230718",
              srtnCd: "005930",
              isinCd: "KR7005930003",
              itmsNm: "삼성전자",
              mrktCtg: "KOSPI",
              clpr: "72000",
              vs: "-1300",
              fltRt: "-1.77",
              mkp: "73200",
              hipr: "73500",
              lopr: "72000",
              trqu: "11697900",
              trPrc: "847564074902",
              lstgStCnt: "5969782550",
              mrktTotAmt: "429824343600000",
            },
            {
              basDt: "20230717",
              srtnCd: "005930",
              isinCd: "KR7005930003",
              itmsNm: "삼성전자",
              mrktCtg: "KOSPI",
              clpr: "73300",
              vs: "-100",
              fltRt: "-.14",
              mkp: "73200",
              hipr: "73500",
              lopr: "72800",
              trqu: "10060049",
              trPrc: "736819227400",
              lstgStCnt: "5969782550",
              mrktTotAmt: "437585060915000",
            },
            {
              basDt: "20230714",
              srtnCd: "005930",
              isinCd: "KR7005930003",
              itmsNm: "삼성전자",
              mrktCtg: "KOSPI",
              clpr: "73400",
              vs: "1500",
              fltRt: "2.09",
              mkp: "72500",
              hipr: "73400",
              lopr: "72400",
              trqu: "15882519",
              trPrc: "1159932414471",
              lstgStCnt: "5969782550",
              mrktTotAmt: "438182039170000",
            },
            {
              basDt: "20230713",
              srtnCd: "005930",
              isinCd: "KR7005930003",
              itmsNm: "삼성전자",
              mrktCtg: "KOSPI",
              clpr: "71900",
              vs: "0",
              fltRt: "0",
              mkp: "72400",
              hipr: "72600",
              lopr: "71900",
              trqu: "14417279",
              trPrc: "1041644744600",
              lstgStCnt: "5969782550",
              mrktTotAmt: "429227365345000",
            },
            {
              basDt: "20230712",
              srtnCd: "005930",
              isinCd: "KR7005930003",
              itmsNm: "삼성전자",
              mrktCtg: "KOSPI",
              clpr: "71900",
              vs: "400",
              fltRt: ".56",
              mkp: "71200",
              hipr: "72000",
              lopr: "71100",
              trqu: "10375581",
              trPrc: "742662492675",
              lstgStCnt: "5969782550",
              mrktTotAmt: "429227365345000",
            },
            {
              basDt: "20230711",
              srtnCd: "005930",
              isinCd: "KR7005930003",
              itmsNm: "삼성전자",
              mrktCtg: "KOSPI",
              clpr: "71500",
              vs: "2000",
              fltRt: "2.88",
              mkp: "70200",
              hipr: "71500",
              lopr: "70100",
              trqu: "12177392",
              trPrc: "863673766650",
              lstgStCnt: "5969782550",
              mrktTotAmt: "426839452325000",
            },
            {
              basDt: "20230710",
              srtnCd: "005930",
              isinCd: "KR7005930003",
              itmsNm: "삼성전자",
              mrktCtg: "KOSPI",
              clpr: "69500",
              vs: "-400",
              fltRt: "-.57",
              mkp: "70000",
              hipr: "70400",
              lopr: "69200",
              trqu: "11713926",
              trPrc: "816772079400",
              lstgStCnt: "5969782550",
              mrktTotAmt: "414899887225000",
            },
            {
              basDt: "20230707",
              srtnCd: "005930",
              isinCd: "KR7005930003",
              itmsNm: "삼성전자",
              mrktCtg: "KOSPI",
              clpr: "69900",
              vs: "-1700",
              fltRt: "-2.37",
              mkp: "71100",
              hipr: "71400",
              lopr: "69800",
              trqu: "17308877",
              trPrc: "1215404338500",
              lstgStCnt: "5969782550",
              mrktTotAmt: "417287800245000",
            },
          ],
        },
      },
    },
  };

  // 날짜와 종가 데이터 추출
  var dates = data.response.body.items.item
    .map(function (item) {
      return item.basDt;
    })
    .reverse();

  var prices = data.response.body.items.item
    .map(function (item) {
      return parseInt(item.clpr, 10);
    })
    .reverse();

  // Highcharts options
  const options = {
    legend: {
      enabled: false,
    },
    chart: {
      type: "areaspline",
      width: 290,
      height: 195,
    },
    title: {
      text: "삼성전자",
    },
    xAxis: {
      categories: dates,
      title: {
        // text: "Date",
      },
      labels: {
        formatter: function () {
          const date = new Date(this.value);
          return Highcharts.dateFormat("%m-%d", date.getTime());
        },
      },
      enabled: false,
    },
    yAxis: {
      //   tickInterval: 10,
      title: {
        text: null,
      },
      labels: {
        enabled: false,
        visible: false,
      },
    },
    series: [
      {
        type: "areaspline",
        name: "Samsung",
        data: prices,
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "rgb(0, 0, 255)"], // blue at the top
            [1, "rgb(255, 255, 255)"], // white at the bottom
          ],
        },
        fillOpacity: 0.4,
      },
    ],
    plotOptions: {
      areaspline: {
        lineWidth: 1,
        lineColor: "blue", //blackborder
        marker: {
          enabled: false,
        },
      },
    },
  };

  return (
    <>
      <SamsungStockBox>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </SamsungStockBox>
    </>
  );
};

export default Samsung;
