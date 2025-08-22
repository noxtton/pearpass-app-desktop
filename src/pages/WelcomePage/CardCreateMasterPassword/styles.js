import styled from 'styled-components'

export const CardContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  width: 480px;
`

export const CardTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
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
