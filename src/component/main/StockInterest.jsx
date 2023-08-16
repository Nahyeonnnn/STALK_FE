import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 90vw;
  margin: auto;
`;

const Box = styled.div`
  width: 90vw;
  height: 100%;
  margin: auto;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  padding-bottom: 4rem;
`;

const RankItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; 
  padding: 0.5rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Num = styled.div`
  color: var(--black-80-base, #2E3032);
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.42857rem;
  letter-spacing: -0.084rem;
`;

const Name = styled.div`
  color: var(--black-80-base, #2E3032);
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.42857rem;
  letter-spacing: -0.084rem;
  margin-left: 2rem;
`;
const StockInterest = () => {
    return (
        <div>
            
        </div>
    );
};


export default StockInterest;
