import styled from 'styled-components'

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ActionCardTitle = styled.p`
  color: ${({ theme }) => theme.colors.white.mode1};
  width: 293px;
  font-family: 'Inter';
  text-align: center;
  font-size: 29px;
  font-style: normal;
  font-weight: 400;
  line-height: 39px;
`

export const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 25px;
`
