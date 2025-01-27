import styled from 'styled-components'

export const NestedFoldersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 4px;
  margin-bottom: 6px;
`

export const NestedItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`

export const NestedFolder = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop)
})`
  display: flex;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary400.mode1 : undefined};
  align-items: center;
  gap: 10px;
`

export const AddIconWrapper = styled.div`
  cursor: pointer;
`
