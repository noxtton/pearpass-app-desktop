import styled from 'styled-components'

export const PopupMenuContainer = styled.div`
  position: absolute;
  left: ${({ anchor }) => {
    switch (anchor) {
      case 'left':
        return '0'
      case 'center':
        return '50%'
      case 'right':
        return '100%'
      default:
        return '0'
    }
  }};
  bottom: ${({ gap }) => `-${gap}px`};
`

export const MenuWrapper = styled.div`
  display: flex;
  font-family: 'Inter';
  position: absolute;
  flex-direction: column;
  z-index: 1000;
  width: 200px;
  align-items: flex-start;
  overflow: hidden;
  transform: ${({ position }) => {
    switch (position) {
      case 'left':
        return 'translateX(0)'
      case 'center':
        return 'translateX(-50%)'
      case 'right':
        return 'translateX(-100%)'
      default:
        return 'translateX(0)'
    }
  }};
`

export const MenuItem = styled.div`
  display: flex;
  width: 100%;
  padding: 5px 9px;
  gap: 12px;
  align-self: stretch;
  color: ${({ theme }) => theme.colors.white.mode1};
  background: ${({ theme }) => theme.colors.grey400.mode1};
  border: 1px solid ${({ theme }) => theme.colors.grey100.mode1};
  border-bottom: none;
  cursor: pointer;
  position: relative;

  &:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  &:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey100.mode1};
  }

  &:hover {
    border-color: ${({ color }) => color};
  }

  &:hover + div {
    border-top-color: ${({ color }) => color};
  }
`
