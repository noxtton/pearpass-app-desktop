import styled from 'styled-components'

export const TRANSITION_DURATION = 250

export const MenuWrapper = styled.div`
  position: relative;
  display: inline-block;
`

const getTransformByDirection = (direction) => {
  if (direction === 'top') {
    return 'translate(-100%, calc(-100% - 10px))'
  }
  if (direction === 'right') {
    return 'translate(10px, -50%)'
  }
  if (direction === 'bottom') {
    return 'translate(-50%, 10px)'
  }
  if (direction === 'left') {
    return 'translate(10px, -50%)'
  }
  if (direction === 'topRight') {
    return 'translate(0, calc(-100% - 10px))'
  }
  if (direction === 'topLeft') {
    return 'translate(-100%, calc(-100% - 10px))'
  }
  if (direction === 'bottomRight') {
    return 'translate(0, 10px)'
  }
  if (direction === 'bottomLeft') {
    return 'translate(-100%, 10px)'
  }
}

export const MenuCard = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      'direction',
      'isOpen',
      'top',
      'left',
      'height',
      'width',
      'shouldRender'
    ].includes(prop)
})`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  position: fixed;
  z-index: 1000;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ shouldRender }) => (shouldRender ? 'visible' : 'hidden')};
  transition:
    opacity ${TRANSITION_DURATION}ms ease-in-out,
    visibility ${TRANSITION_DURATION}ms ease-in-out;

  & {
    transform: ${({ direction }) => getTransformByDirection(direction)};
  }

  @keyframes identifier {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const MenuTrigger = styled.div`
  cursor: pointer;
`
