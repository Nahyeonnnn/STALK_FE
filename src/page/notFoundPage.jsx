import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

library.add(faTriangleExclamation);

const CautionIcon = styled(FontAwesomeIcon)`
    color: #F1D00A;
    margin-top: 20vh;
`;

const NotFoundDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const NotFound = styled.p`
    text-align: center;
    color: white;
`;

const HorizonLine = styled.div`
    background-color: #ffffff8d;
    height: 1px;
    width: 60vw;
    margin-bottom: 2rem;
    margin-left: auto;
    margin-right: auto;
`;

const ButtonDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const BackToMain = styled.button`
    border: none;
    background: none;
    background-color : #F1D00A;
    font-size: 1rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-radius: 10px;
`;

const BackToPrevious = styled.button`
    border: none;
    background: none;
    background-color: white;
    font-size: 1rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-radius: 10px;
`;

const NotFoundPage = () => {

    const navigate = useNavigate();

    function BackToMainClick(){
        navigate(`/main`); //mainPage로 돌아가는 버튼
    }

    function BackToPreClick(){
        navigate(-1);
    }

    return (
        <NotFoundDiv>
            <CautionIcon icon={faTriangleExclamation} size="3x"></CautionIcon>
            <NotFound>페이지를 찾을 수 없습니다.</NotFound>
            <HorizonLine></HorizonLine>
            <ButtonDiv>
                <BackToMain onClick={BackToMainClick}>메인으로 돌아가기</BackToMain>
                <BackToPrevious onClick={BackToPreClick}>이전으로 돌아가기</BackToPrevious>
            </ButtonDiv>
        </NotFoundDiv>
        );
    };
    export default NotFoundPage;