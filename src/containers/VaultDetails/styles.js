import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.white.option2};
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 700;
`

export const FavoriteWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.colors.grey200.option2};
  font-family: 'Inter';
  font-size: 12px;
  font-weight: 400;
  margin-top: 2px;
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
`
