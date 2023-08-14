import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center; /* 가로 방향 중앙 정렬 */
  //align-items: center; /* 세로 방향 중앙 정렬 */
  //height: 100vh; /* 부모 요소의 높이를 설정해야 수직 정렬이 정확히 보입니다. */
  //flex-direction: column;
`;

const Assetbox = styled.div`
  width: 17.3125rem;
  height: 13.4375rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: #f1d00a;
  margin-top: 3rem;
  margin-bottom: 3rem;
  z-index: 0;
`;

const Text = styled.p`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem; /* 183.333% */
  letter-spacing: -0.0187rem;
  margin-top: 1.5rem;
`;

const AssetText = styled.p`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.375rem; /* 68.75% */
  letter-spacing: -0.05rem;
`;

const Btn = styled.button`
  width: 5.5rem;
  height: 3.25rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background-color: #fff;
  border: none;
  z-index: 1;
  margin: 5%;

  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.375rem; /* 157.143% */
  letter-spacing: -0.0219rem;
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: center; /* 가로 방향 중앙 정렬 */
  align-items: center; /* 세로 방향 중앙 정렬 */
`;

const MyAsset = ({ userProperty }) => {
  return (
    <>
      <Container>
        <Assetbox>
          <Text>총 자산</Text>
          <AssetText>{userProperty}</AssetText>
          <BtnContainer>
            <Btn>예금</Btn>
            <Btn>출금</Btn>
          </BtnContainer>
        </Assetbox>
      </Container>
    </>
  );
};

export default MyAsset;
