import React from 'react';
import { styled } from 'styled-components';

const InfoBox = styled.div`
    display : flex;
    width : 80vw;
    height : 25vh;
    flex-wrap : wrap;
    background-color : white;
    border-radius : .625rem;
    margin-left: auto;
    margin-right : auto;
    margin-top : 1.5rem;
    margin-bottom : 2rem;
`

const InfoDate = styled.div`
    display:flex;
    justify-content : center;
    align-items : center;
    width : 17%;
`

const InfoContainer = styled.div`
    display :flex;
    flex-direction : column;
    justify-content : center;
    align-items : flex-start;
    width : 75%;
`

const InfoTitle = styled.div`
    display: flex;
    font-weight : 700;
`;

const InfoText = styled.div`
    display: flex;
    font-weight: 100;
    color: ${({ textColor }) => textColor || '#3E497A'};
`;


const DetailInfo = () => {
    return (
        <>
           <InfoBox>
                <InfoDate>7.19</InfoDate>
                <InfoContainer>
                    <InfoTitle>2023년 2분기 실적발표</InfoTitle>
                    <InfoText>매출 $9.2억, 1주당 순이익 $0.71</InfoText>
                </InfoContainer>

                <InfoDate>7.19</InfoDate>
                <InfoContainer>
                    <InfoTitle>2023년 2분기 실적발표</InfoTitle>
                    <InfoText>매출 $9.2억, 1주당 순이익 $0.71</InfoText>
                </InfoContainer>

                <InfoDate>7.19</InfoDate>
                <InfoContainer>
                    <InfoTitle>2023년 2분기 실적발표</InfoTitle>
                    <InfoText>매출 $9.2억, 1주당 순이익 $0.71</InfoText>
                </InfoContainer>
           </InfoBox>
        </>
    );
};

export default DetailInfo;