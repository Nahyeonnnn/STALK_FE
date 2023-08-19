import React from "react";
import LogoImg from "./Stalk_logo.png";
import { styled } from "styled-components";

const StalkLogoImg = styled.img`
  width: 5rem;
  height: 5rem;
  opacity: 0.4;
  //margin-top: 20vh;
`;

const StalkLogo = () => {
  return (
    <div>
      <StalkLogoImg src={LogoImg}></StalkLogoImg>
    </div>
  );
};

export default StalkLogo;
