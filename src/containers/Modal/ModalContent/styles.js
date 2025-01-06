import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 640px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey300.option2};
  background: ${({ theme }) => theme.colors.grey500.option2};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 10px;
`

export const HeaderChildrenWrapper = styled.div`
  flex: 1;
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
