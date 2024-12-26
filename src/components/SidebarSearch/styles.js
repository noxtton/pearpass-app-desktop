import styled from 'styled-components'

export const sidebarSearchContainer = styled.div`
  height: 29px;
  font-family: Inter;
  font-size: 16px;
  display: flex;
  align-items: center;
  padding: 5px 30px;
  position: relative;
`

export const SearchLabelIcon = styled.label`
  position: absolute;
  height: 14px;
  left: 0;

  & path {
    stroke: ${({ theme }) => theme.colors.primary400.mode1};
  }
`

export const SearchInput = styled.input`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.grey200.mode1};

  &:focus {
    border: none;
    box-shadow: none;
    outline: none;
  }

  &::-webkit-search-cancel-button {
    appearance: none;
  }
`
