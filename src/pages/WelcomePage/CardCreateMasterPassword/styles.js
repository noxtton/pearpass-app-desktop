import styled from 'styled-components'

export const CardContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  width: 609px;
`

export const CardTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  max-width: 489px;

  color: ${({ theme }) => theme.colors.white.mode1};
  padding: 4px 0px;
  text-align: center;
  font-family: 'Inter';
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.white.mode1};
  text-align: center;
  font-family: 'Inter';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
export const Description = styled.p`
  color: ${({ theme }) => theme.colors.white.mode1};
  text-align: center;
  font-family: 'Inter';
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`

export const ButtonWrapper = styled.div`
  align-self: center;
`

export const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const InputLabel = styled.label`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & > :first-child {
    pointer-events: none;
    border-color: ${({ theme, isError }) =>
      isError ? theme.colors.errorRed.mode1 : theme.colors.primary400.mode1};
  }
`

export const RadioText = styled.span`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

export const RadioTextBold = styled.span`
  cursor: pointer;
  font-weight: 600;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`

export const TermsOfUseContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
  width: 50vw;
`

export const CloseButtonContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`
