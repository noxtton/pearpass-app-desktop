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

export const ActionsCard = styled.div`
  display: flex;
  font-family: 'Inter';
  flex-direction: column;
  gap: 23px;
  width: 376px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.grey500.mode1};
  border: 1px solid ${({ theme }) => theme.colors.grey400.mode1};
  border-radius: 20px;
  padding: 9px 15px;
  z-index: 1;
`

export const ActionCardTitle = styled.p`
  color: ${({ theme }) => theme.colors.white.mode1};
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

export const ModalCard = styled.div`
  display: flex;
  font-family: 'Inter';
  flex-direction: column;
  gap: 23px;
  width: 376px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.grey500.mode1};
  border: 1px solid ${({ theme }) => theme.colors.grey400.mode1};
  border-radius: 20px;
  padding: 9px 15px;
  z-index: 1;
`

export const LoadVaultCard = styled.div`
  font-family: 'Inter';
  display: flex;
  padding: 20px 22px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.grey500.mode1};
  border: 1px solid ${({ theme }) => theme.colors.grey400.mode1};
  border-radius: 20px;
  z-index: 1;
`
export const LoadVaultTitle = styled.span`
  color: ${({ theme }) => theme.colors.white.mode1};
  text-align: center;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

export const LoadVaultInput = styled.input`
  display: flex;
  width: 437px;
  padding: 12px 20px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 30px;
  background: ${({ theme }) => theme.colors.grey400.mode1};
  border: 1px solid ${({ theme }) => theme.colors.grey300.mode1};
  color: ${({ theme }) => theme.colors.grey200.mode1};

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey100.mode1};
  }

  &:active,
  &:focus {
    box-shadow: none;
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.grey200.mode1};
  }
`
