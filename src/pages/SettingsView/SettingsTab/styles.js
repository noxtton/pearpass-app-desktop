import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const ButtonWrapper = styled.div`
  align-self: self-start;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const VersionWrapper = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white.mode1};
  font-weight: 600;
  line-height: 16px;
  margin-top: 10px;
`
