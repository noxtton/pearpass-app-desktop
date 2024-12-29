import styled from 'styled-components'

export const CompoundFieldComponent = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isFocused'].includes(prop)
})`
  border-radius: 10px;
  padding: 8px 10px;
  border: 1px solid
    ${({ theme, isFocused }) =>
      isFocused ? theme.colors.primary300.mode1 : theme.colors.grey100.option2};
  background-color: ${({ theme }) => theme.colors.grey400.option2};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary300.mode1};
  }
`
