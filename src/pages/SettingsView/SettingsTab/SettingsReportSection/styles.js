import styled from 'styled-components'

import { DefaultInputWrapper } from '../../../../lib-react-components/components/InputField/styles'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const ButtonWrapper = styled.div`
  align-self: self-start;
`

export const StyledInputFieldWrapper = styled(DefaultInputWrapper)`
  &:not(:first-child) {
    border-top: none;
    margin-top: 0;
    padding-top: 0;
  }
  & input {
    border-radius: 10px;
    padding: 12px 11px;
    border: 1px solid ${({ theme }) => theme.colors.grey100.mode1};
    font-family: 'Inter';
    font-size: 12px;
    line-height: normal;
    cursor: pointer;
    &::placeholder {
      font-weight: 400;
      color: ${({ theme }) => theme.colors.grey300.mode1};
    }
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary400.mode1};
    }
  }
`
