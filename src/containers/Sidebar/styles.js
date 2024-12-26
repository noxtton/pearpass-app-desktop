import styled from 'styled-components'

export const SidebarWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 25px 20px;
  color: ${({ theme }) => theme.colors.white};
  font-family: Inter;
  width: 296px;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  border-right: 1px solid ${({ theme }) => theme.colors.grey300};
  background: ${({ theme }) => theme.colors.grey500};
`

export const SidebarLogo = styled.div`
  flex-grow: 0;
  width: 144px;
  height: 26px;
`
export const sideBarContent = styled.div`
  flex: 1;
`
export const SidebarSettings = styled.div`
  flex-grow: 0;
`
