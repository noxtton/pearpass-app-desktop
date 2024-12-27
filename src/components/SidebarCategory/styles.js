import styled from 'styled-components'

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

  ${({ sidebarSize }) =>
    sidebarSize === 'default' &&
    `
    width: 122px;
    padding: 10px 9px;
  `}

  ${({ sidebarSize }) =>
    sidebarSize === 'tight' &&
    `

    width: 100%;
    padding: 5px 9px;
    align-items: center;
  `}
  
    ${({ selected, theme, color }) =>
    selected &&
    `
    background: ${color};  
    color: ${theme.colors.black.mode1};
  `}

    &:hover {
    border-color: ${({ color }) => color};
  }
`

export const CategoryDescription = styled.div`
  display: flex;
  gap: 12px;
  white-space: nowrap;
  font-weight: 600;

  ${({ sidebarSize }) =>
    sidebarSize === 'default' &&
    `
      flex-direction: column;
  `}

  ${({ sidebarSize }) =>
    sidebarSize === 'tight' &&
    `
    align-items: center;
    flex-direction: row;
  `}
`

export const categoryTitle = styled.span``
export const CategoryIconWrapper = styled.div`
  width: 14px;
  height: 14px;

  & path {
    stroke: ${({ color }) => color};
  }

  ${({ selected }) =>
    selected &&
    `
    &  path{
    stroke: black};
    }
  `}
`

export const CategoryQuantity = styled.span`
  font-weight: 300;
`
