import React from 'react';
import { styled } from 'styled-components';
import DetailButton from './detailButton';

const StaticBox = styled.div`
    display : flex;
    width : 80vw;
    height : 20vh;
    justify-content : center;
    align-items : center;
    flex-wrap : wrap;
    background-color : white;
    border-radius : .625rem;
    margin-left: auto;
    margin-right : auto;
    margin-top : 3vh;
    margin-bottom : 4vh;
`

const StaticInfoBox = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    width : 33%;
    height : 40%;
`
const InfoTitle = styled.div`
    color: ${({ textColor }) => textColor || '#8198A5'};
    margin-bottom : 5px;
`

const InfoText = styled.div`
    color: ${({ textColor }) => textColor || '#111111'};
`

const DetailStatic = () => {


    return (
        <>  
            <StaticBox>
                
                <StaticInfoBox>
                    <InfoTitle>시작</InfoTitle>
                    <InfoText textColor="#FFB229">224.54</InfoText>
                </StaticInfoBox>
                
                <StaticInfoBox>
                    <InfoTitle>최고</InfoTitle>
                    <InfoText textColor="#E685FF">227.29</InfoText>
                </StaticInfoBox>

                <StaticInfoBox>
                    <InfoTitle>최저</InfoTitle>
                    <InfoText textColor="#6BBDFF">224.10</InfoText>
                </StaticInfoBox>

                <StaticInfoBox>
                    <InfoTitle>거래량</InfoTitle>
                    <InfoText>834,146</InfoText>
                </StaticInfoBox>

                <StaticInfoBox>
                    <InfoTitle>평균 거래량</InfoTitle>
                    <InfoText>1,461,009</InfoText>
                </StaticInfoBox>

                <StaticInfoBox>
                    <InfoTitle>시가 총액</InfoTitle>
                    <InfoText>43.419B</InfoText>
                </StaticInfoBox>

            </StaticBox>
            <DetailButton></DetailButton>
        </>
    );
};

export default DetailStatic;