import styled from 'styled-components'

export const SidebarWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 25px 20px;
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: Inter;
  width: ${({ size }) => (size === 'tight' ? '245px' : '296px')};
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  border-right: 1px solid ${({ theme }) => theme.colors.grey300.mode1};
  background: ${({ theme }) => theme.colors.grey500.mode1};
`

export const SidebarLogo = styled.div`
  flex-grow: 0;
  width: 144px;
  height: 26px;
`

export const sideBarContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  gap: 20px;
`

export const SidebarNestedFoldersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const SidebarSettings = styled.div`
  width: 100%;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
`

export const SettingsContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 5px;
  gap: 5px;
`

export const SettingsSeparator = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.colors.grey300.mode1};
`
