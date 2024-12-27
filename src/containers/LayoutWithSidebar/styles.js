import styled from 'styled-components'

export const LayoutWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`
export const SideBarWrapper = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
`
export const ContentWrapper = styled.div`
  flex: 1 0 0;
  padding: 29px 15px;
  display: flex;
  align-items: center;
  align-self: stretch;
  background: ${({ theme }) => theme.colors.grey400.mode1};
`
