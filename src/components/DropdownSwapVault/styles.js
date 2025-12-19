import styled from 'styled-components'

import { BASE_TRANSITION_DURATION } from '../../constants/transitions'

export const Wrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.black.mode1};
  border-radius: 10px;
`

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 10px;
  border-radius: 10px;
  border: 1px solid
    ${({ theme, $isOpen }) =>
      $isOpen ? theme.colors.primary400.mode1 : 'transparent'};
  cursor: pointer;
  user-select: none;
`

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`

export const HeaderLabel = styled.span`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;

  & svg {
    transform: ${({ $isOpen }) =>
      $isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'};
    transition: transform ${BASE_TRANSITION_DURATION}ms ease;
  }
`

export const Dropdown = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: ${({ $isOpen }) => ($isOpen ? '10px' : '0')};

  max-height: ${({ $isOpen }) => ($isOpen ? '260px' : '0')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  overflow-x: hidden;
  overflow-y: ${({ $isOpen }) => ($isOpen ? 'auto' : 'hidden')};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};

  transition:
    max-height ${BASE_TRANSITION_DURATION}ms ease,
    opacity ${BASE_TRANSITION_DURATION}ms ease,
    padding ${BASE_TRANSITION_DURATION}ms ease;
`

export const DropdownItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.grey500.mode1};
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateY(0)' : 'translateY(-6px)'};
  will-change: transform, opacity;

  transition:
    opacity ${BASE_TRANSITION_DURATION}ms ease,
    transform ${BASE_TRANSITION_DURATION}ms ease;
  transition-delay: ${({ $isOpen, $delayMs = 0 }) =>
    $isOpen ? `${$delayMs}ms` : '0ms'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary400.mode1};
  }

  & svg {
    flex-shrink: 0;
  }
`

export const DropdownItemLabel = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const CreateVaultButton = styled(DropdownItem)`
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.primary400.mode1};
`
