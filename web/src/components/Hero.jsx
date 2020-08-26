import styled from 'styled-components';

const Hero = styled.div`
  background-image: ${({ imgSrc }) => `url(${imgSrc})`};
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 680px;
`;

export default Hero;
