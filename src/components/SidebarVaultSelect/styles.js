import styled from 'styled-components'

import { BASE_TRANSITION_DURATION } from '../../constants/transitions.js'

export const Wrapper = styled.div`
  position: relative;
  width: 100%;

  background: ${({ theme }) => theme.colors.black.mode1};
  border-radius: 10px;
`

export const HeaderButton = styled.div`
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
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 10px;

  /* black background is owned by Wrapper */
  margin-top: 10px;
  box-sizing: border-box;
  padding: 0 10px 10px 10px;
`
export const DropdownItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.grey500.mode1};
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary400.mode1};
  }

  & svg {
    flex-shrink: 0;
  }
`

export const CreateVaultButton = styled(DropdownItem)`
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.primary400.mode1};
`
