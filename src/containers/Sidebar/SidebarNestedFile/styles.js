import styled from 'styled-components'

export const NestedFileContainer = styled.div`
  position: relative;
`

export const NestedFile = styled.div`
  display: flex;
  width: fit-content;
  position: relative;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  padding-left: 34px;
  margin-bottom: 5px;
  color: ${({ color }) => color};
`
