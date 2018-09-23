import styled, { keyframes } from 'styled-components';
import fadeIn from 'react-animations/lib/fade-in';

const animationFadeIn = keyframes`${fadeIn}`;

export const Figure = styled.figure`
  animation: .5s ${animationFadeIn};
  min-width: 10px;
  max-width: 600px;
  margin: auto auto 10px auto;
`;

export default undefined;