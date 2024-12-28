import styled from 'styled-components'

export const CompoundFieldComponent = styled.div`
  border-radius: 10px;
  padding: 8px 10px;
  border: 1px solid
    ${({ theme, isFocused }) =>
      isFocused ? theme.colors.primary300.mode1 : theme.colors.grey100.mode1};
  background-color: ${({ theme }) => theme.colors.grey400.mode1};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary300.mode1};
  }
`
