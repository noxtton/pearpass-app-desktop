import styled from 'styled-components'

export const Button = styled.div`
  width: fit-content;
  display: inline-flex;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.black.mode1};
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.black.mode1};
  color: ${({ theme }) => theme.colors.primary400.mode1};
  font-family: 'Inter';
  font-size: 12px;
  font-weight: 500;

  & svg path {
    stroke: ${({ theme }) => theme.colors.primary400.mode1};
  }

  &:hover {
    border-color: 1px solid ${({ theme }) => theme.colors.primary400.mode1};
  }
`
