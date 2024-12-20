import styled from 'styled-components'

export const PageContainer = styled.div`
  width: 1200px;
  height: 100%;
`

export const PearHand = styled.img`
  position: relative;
  width: 450px;
  height: 450px;
  left: -50px;
`

export const PageContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 120px;
`

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.white};
  width: 900px;
  font-family: 'Humble Nostalgia';
  font-size: 152px;
  font-style: normal;
  font-weight: 400;
  line-height: 191px;
`

export const GreenText = styled.span`
  color: ${({ theme }) => theme.colors.primary400};
`
