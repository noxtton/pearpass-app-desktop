import styled from 'styled-components'

export const PageContainer = styled.div`
  width: 100%;
  margin-top: 202px;
  display: flex;
  align-items: center;
`

export const Title = styled.p`
  width: 638px;
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Humble Nostalgia';
  font-size: 109px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

export const CardVaultActions = styled.div`
  display: inline-flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.grey500.mode1};
  border: 1px solid ${({ theme }) => theme.colors.grey400.mode1};
  border-radius: 20px;
  padding: 20px;
  z-index: 1;
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

export const PearHand = styled.img`
  position: absolute;
  width: 700;
  height: 800px;
  right: 0;
  z-index: 0;
`
