import styled from 'styled-components'

export const PasswordStrongnessWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isStrong'].includes(prop)
})`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme, isStrong }) =>
    isStrong ? theme.colors.primary400.mode1 : theme.colors.errorYellow.mode1};
  font-family: 'Inter';
  font-size: 8px;
  font-weight: 500;
`
