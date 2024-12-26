import styled from 'styled-components'

export const NestedFoldersWrapper = styled.div``

export const NestedFoldersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 4px;
  margin-bottom: 5px;
`

export const NestedItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`

export const NestedFolder = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const NestedItemName = styled.span``

export const LowLevelNestedItemContainer = styled.div``

export const NestedFile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 34px;
  margin-bottom: 5px;
`

export const AddNewFile = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
  padding-left: 34px;
  color: ${({ theme }) => theme.colors.primary400};
  & svg path {
    stroke: ${({ theme }) => theme.colors.primary400};
  }
`
