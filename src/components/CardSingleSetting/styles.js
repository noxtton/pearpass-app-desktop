import styled from 'styled-components'

export const Container = styled.div`
  padding: 17px 20px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey100.mode1};
`
export const Header = styled.div`
  padding-bottom: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white.mode1};
`

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
`
export const Content = styled.div`
  padding-top: 15px;
`
