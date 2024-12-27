import styled, { css } from 'styled-components'

export const CategoryButton = styled.button`
  display: flex;
  font-family: Inter;
  font-size: 16px;
  line-height: normal;
  flex-direction: row;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.grey400.mode1};
  border-radius: 10px;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.colors.white.mode1};
  cursor: pointer;

  &:hover {
    border-color: ${({ color }) => color};
  }

  ${({ size }) =>
    size === 'default' &&
    css`
      width: 122px;
      padding: 10px 9px;
    `}

  ${({ size }) =>
    size === 'tight' &&
    css`
      width: 100%;
      padding: 5px 9px;
      align-items: center;
    `}
  
    ${({ selected, theme, color }) =>
    selected &&
    css`
      background: ${color};
      color: ${theme.colors.black.mode1};
    `}
`

export const CategoryDescription = styled.div`
  display: flex;
  gap: 12px;
  white-space: nowrap;
  font-weight: 600;

  ${({ size }) =>
    size === 'default' &&
    css`
      flex-direction: column;
    `}

  ${({ size }) =>
    size === 'tight' &&
    css`
      align-items: center;
      flex-direction: row;
    `}
`

export const CategoryIconWrapper = styled.div`
  width: 14px;
  height: 14px;

  & path {
    stroke: ${({ color, theme, selected }) =>
      selected ? theme.colors.black.mode1 : color};
  }
`

export const CategoryQuantity = styled.span`
  font-weight: 300;
`
