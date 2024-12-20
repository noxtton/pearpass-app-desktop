import styled from 'styled-components'

export const PageContainer = styled.div`
  width: 100%;
  margin-top: 202px;
  display: flex;
  align-items: center;
`

export const Title = styled.p`
  width: 638px;
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Humble Nostalgia';
  font-size: 109px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

export const ActionsCard = styled.div`
  box-sizing: border-box;
  display: flex;
  font-family: 'Inter';
  flex-direction: column;
  gap: 23px;
  width: 376px;
  height: 207px;
  background: ${({ theme }) => theme.colors.grey500};
  border: 1px solid ${({ theme }) => theme.colors.grey400};
  border-radius: 20px;
  padding: 9px 15px;
`
export const ActionCardTitle = styled.p`
  color: ${({ theme }) => theme.colors.white};
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
