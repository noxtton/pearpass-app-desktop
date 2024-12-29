import styled from 'styled-components'

export const MenuWrapper = styled.div`
  display: flex;
  font-family: 'Inter';
  position: relative;
  flex-direction: column;
  z-index: 1000;
  width: 200px;
  align-items: flex-start;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey100.mode1};
  background: ${({ theme }) => theme.colors.grey400.mode1};
  overflow: hidden;
`

export const MenuItem = styled.div`
  display: flex;
  width: 100%;
  padding: 5px 9px;
  gap: 12px;
  align-self: stretch;
  color: ${({ theme }) => theme.colors.white.mode1};
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey100.mode1};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.black.mode1};
    background: ${({ color }) => color};

    & svg path {
      stroke: ${({ theme }) => theme.colors.black.mode1};
    }
  }
`
