import React from "react";
import LogoImg from "./Stalk_logo.png";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: 0;
`;

const StalkLogoImg = styled.img`
  width: 22rem;
  height: 22rem;
  opacity: 0.5;
  z-index: 0;
`;

const StalkLogo = () => {
  return (
    <Container>
      <StalkLogoImg src={LogoImg} />
    </Container>
  );
};

export default StalkLogo;
