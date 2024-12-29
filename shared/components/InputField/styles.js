import styled from 'styled-components'

export const InputWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;

  & + & {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid ${({ theme }) => theme.colors.grey100.mode1};
  }
`

export const IconWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-top: 9px;
`

export const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 12px;
  font-weight: 400;
`

export const Input = styled.input`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 700;
  margin-top: 5px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey100.mode1};
  }
`

export const ErrorMessageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  margin-top: 2px;
`

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.errorRed.option2};
  font-family: 'Inter';
  font-size: 8px;
  font-weight: 500;
`

export const AdditionalItems = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  align-self: center;
`
