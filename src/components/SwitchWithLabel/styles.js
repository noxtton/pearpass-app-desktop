import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`

export const Label = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isBold'].includes(prop)
})`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 14px;
  font-weight: ${({ isBold }) => (isBold ? '600' : '400')};
`
