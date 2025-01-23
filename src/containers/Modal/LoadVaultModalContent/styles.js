import styled from 'styled-components'

export const LoadVaultCard = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isLoading'].includes(prop)
})`
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
  cursor: ${({ isLoading }) => (isLoading ? 'wait' : 'default')};

  & > * {
    pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'auto')};
  }
`

export const LoadVaultTitle = styled.span`
  color: ${({ theme }) => theme.colors.white.mode1};
  text-align: center;
  font-family: 'Inter';
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
  color: ${({ theme }) => theme.colors.white.mode1};

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
