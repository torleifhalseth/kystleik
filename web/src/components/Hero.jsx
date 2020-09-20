import styled from 'styled-components';

const Hero = styled.img`
  object-fit: cover;
  width: 100%;
  height: 380px;

  @media (min-width: 768px) {
    height: 680px;
  }
`;

export default Hero;
