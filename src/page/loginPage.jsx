import React from 'react';
import KakaoLoginBox from '../component/login/kakaoLoginBox';
import StalkLogo from '../component/login/StalkLogo';
import { styled } from 'styled-components';

const LoginDiv = styled.div`
    display: block;
    text-align: center;
`;

const LoginPage = () => {
    return (
        <LoginDiv>
            <StalkLogo></StalkLogo>
            <KakaoLoginBox></KakaoLoginBox>
        </LoginDiv>
    );
};

export default LoginPage;