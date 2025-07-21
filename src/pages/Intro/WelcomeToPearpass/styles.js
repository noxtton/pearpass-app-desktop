import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export const ImageContainer = styled.div`
  max-width: 700px;
`

export const DescriptionText = styled.span`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Humble Nostalgia';
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.8s ease-in;
`
