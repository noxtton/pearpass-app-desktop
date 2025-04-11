import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 1px 0px;
`

export const NavBar = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 750px;
`

export const Tabs = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey100.mode1};
`

export const TabTitle = styled.span`
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary400.mode1 : theme.colors.grey100.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-style: normal;
  font-weight: ${({ isActive }) => (isActive ? 700 : 500)};
  cursor: pointer;
`
