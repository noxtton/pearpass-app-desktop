import styled from 'styled-components'

export const Overlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ opacity }) => `rgba(0, 0, 0, ${opacity})`};
  backdrop-filter: ${({ blur }) => `blur(${blur})`};
  z-index: 5;
`
