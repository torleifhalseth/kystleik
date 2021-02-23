import React from 'react';
import styled from 'styled-components';

const HeroImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 380px;

  @media (min-width: 768px) {
    height: 680px;
  }
`;

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  max-width: 960px;
  margin: 0 auto;
  @media (min-width: 450px) {
    padding: 0 2em;
  }
`;

export default props => (
  <Container>
    <svg
      style={{ position: 'absolute', top: '-2px', left: '0' }}
      width="100%"
      viewBox="0 0 4323 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="hidden"
    >
      <path
        d="M4323 100.909C4091.5 149.475 3848.5 63.0061 3412 47.3859C2750.36 23.7092 2638.5 209.134 2124.5 245.953C1683.02 277.578 1127.5 114.203 721 90.6202C314.504 67.0372 0 121.582 0 121.582V5.78165e-06H4323C4323 5.78165e-06 4323 222.431 4323 100.909Z"
        fill="#FCF8F3"
      />
    </svg>
    <HeroImage {...props} />
    <svg
      style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        height: 'auto',
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="4323"
      height="302"
      fill="none"
      viewBox="0 0 4323 302"
    >
      <path
        fill="#FCF8F3"
        d="M-46 52c40.5 34.5 306.5-30.521 1013 59C2052 235.336 1871.01-22.204 2460.01 2.1c444.73 18.35 723.5 105.934 1130 148.208s733.5 12.931 733.5 12.931V301.5H.513S-46 215-46 52z"
      />
    </svg>
  </Container>
);
