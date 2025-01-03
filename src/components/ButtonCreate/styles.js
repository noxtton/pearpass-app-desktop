import styled from 'styled-components'

export const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 8px;
  background: ${({ theme }) => theme.colors.primary300.mode1};
  border: 1px solid ${({ theme }) => theme.colors.grey100.mode1};
  border-radius: 10px;
  cursor: pointer;

  font-family: Inter;
  font-size: 12px;
  font-weight: 600;
  line-height: normal;

  &:hover {
    background: ${({ theme }) => theme.colors.primary400.mode1};
  }
`

export const IconWrapper = styled.div`
  position: absolute;
  transform: translateY(50%);
  top: 0;
  left: 8px;
`
