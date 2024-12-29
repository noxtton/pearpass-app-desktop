import styled from 'styled-components'

export const NestedFileContainer = styled.div`
  position: relative;
`

export const NestedFile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  padding-left: 34px;
  margin-bottom: 5px;
  color: ${({ color }) => color};
`

export const NewPopupMenuOpenContainer = styled.div`
  position: absolute;
  left: 34px;
`
