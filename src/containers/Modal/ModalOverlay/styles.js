import styled from 'styled-components'

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ type }) => {
    if (type === 'default') {
      return 'rgba(35, 35, 35, 0.6)'
    }

    if (type === 'blur') {
      return 'rgba(0, 0, 0, 0.5)'
    }
  }};
  backdrop-filter: ${({ type }) => {
    if (type === 'default') {
      return 'none'
    }

    if (type === 'blur') {
      return 'blur(10px)'
    }
  }};
`
