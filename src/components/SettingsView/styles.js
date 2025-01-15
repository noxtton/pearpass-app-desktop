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
