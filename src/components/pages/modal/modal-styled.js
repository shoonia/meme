import styled from 'styled-components';

export const ModalImage = styled.img`
  max-height: 90vh;
`;

export const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0,0,0, .6)',
    zIndex: '101',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '10px',
    right: '10px',
    bottom: '10px',
    border: 'none',
    background: 'transparent',
    overflow: 'hidden',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '0',
    outline: 'none',
    padding: '0',
  },
};
