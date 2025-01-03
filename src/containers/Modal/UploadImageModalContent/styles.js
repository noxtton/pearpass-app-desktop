import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  display: flex;
  gap: 8px;
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 500;
`

export const ContentWrapper = styled.div`
  margin-bottom: 15px;
`

export const HiddenInput = styled.input`
  display: none;
`
