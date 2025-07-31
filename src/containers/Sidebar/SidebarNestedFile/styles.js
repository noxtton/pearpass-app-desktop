import styled from 'styled-components'

export const NestedFileContainer = styled.div`
  position: relative;
  padding-left: 31px;
`

export const NestedFile = styled.div`
  display: flex;
  width: fit-content;
  position: relative;
  align-items: center;
  gap: 10px;
  color: ${({ color }) => color};
  cursor: pointer;
`
