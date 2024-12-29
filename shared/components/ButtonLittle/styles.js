import styled, { css } from 'styled-components'

export const Button = styled.div`
  width: fit-content;
  display: inline-flex;
  border-radius: 10px;
  padding: 4px 5px;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-weight: 500;
  font-family: 'Inter';

  ${({ variant, theme }) => {
    if (variant === 'primary') {
      return css`
        background: ${theme.colors.primary300.mode1};
        color: ${theme.colors.grey500.mode1};
        border: 1px solid ${theme.colors.primary300.mode1};

        & svg path {
          stroke: ${theme.colors.grey500.mode1};
        }

        &:hover {
          border: 1px solid ${theme.colors.primary400.mode1};
          background: ${theme.colors.primary400.mode1};
        }
      `
    }

    if (variant === 'secondary') {
      return css`
        background: ${theme.colors.black.mode1};
        color: ${theme.colors.primary300.mode1};
        border: 1px solid ${theme.colors.black.mode1};

        & svg path {
          stroke: ${theme.colors.primary300.mode1};
        }

        &:hover {
          border-color: ${theme.colors.primary400.mode1};
          color: ${theme.colors.primary400.mode1};

          & svg path {
            stroke: ${theme.colors.primary400.mode1};
          }
        }
      `
    }
  }};
`
