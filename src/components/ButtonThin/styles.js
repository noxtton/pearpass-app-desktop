import styled, { css } from 'styled-components'

export const Button = styled.div`
  width: fit-content;
  height: auto;
  flex-direction: row;
  display: inline-flex;
  padding: 5px;
  border: 1px solid transparent;
  align-items: center;
  gap: 5px;
  border-radius: 10px;

  ${({ variant, theme }) =>
    variant === 'black'
      ? css`
          background: ${theme.colors.black.mode1};
          color: ${theme.colors.primary300.mode1};

          & svg path {
            stroke: ${theme.colors.primary300.mode1};
          }

          &:hover {
            border: 1px solid ${theme.colors.primary400.mode1};
            color: ${theme.colors.primary400.mode1};

            & svg path {
              stroke: ${theme.colors.primary400.mode1};
            }
          }
        `
      : css`
          background: ${theme.colors.grey300.mode1};
          color: ${theme.colors.white.mode1};
        `};
`
