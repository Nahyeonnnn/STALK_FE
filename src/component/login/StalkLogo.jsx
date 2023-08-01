import React from 'react';
import LogoImg from './Stalk_logo.png';
import { styled } from 'styled-components';

const StalkLogoImg = styled.img`
    width: 22rem;
    height: 22rem;
    margin-top: 20vh;
`;

const StalkLogo = () => {
    return (
        <div>
            <StalkLogoImg src={LogoImg}></StalkLogoImg>
        </div>
    );
};

export default StalkLogo;