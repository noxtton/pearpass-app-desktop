import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 42px;
  gap: 10px;
`

export const HeaderChildrenWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`

export const CloseIconWrapper = styled.div`
  margin-left: auto;
  display: flex;
  padding: 2.5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.black.option2};
  flex-shrink: 0;
`

export const HeaderButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
