import styled, { keyframes } from 'styled-components';
import fadeIn from 'react-animations/lib/fade-in';

const animationFadeIn = keyframes`${fadeIn}`;

export const ArticleFadeIn = styled.article`
  animation: .5s ${animationFadeIn};
  max-width: 600px;
  min-height: 200px;
`;

export const Img = styled.img`
  max-height: 40vh;
`;

export const Wrapper = styled.div`
  max-width: 600px;
`;

export const WrapperButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  margin: 0;
`;