import React from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import LoginButton from './kakao_login_large_narrow.png';

const ButtonImg = styled.img`
    width: 16rem;
    max-width: 250px;
`;

const KakaoLoginBox = () => {

    function LoginClick(){
        // axios
        //     .get()
        //
    }

    return (
        <div>
            <ButtonImg src={LoginButton} onClick={LoginClick}></ButtonImg>
        </div>
    );
};

export default KakaoLoginBox;