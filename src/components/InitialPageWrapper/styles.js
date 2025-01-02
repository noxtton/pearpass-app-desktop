import styled from 'styled-components'

export const Background = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.black.mode1};
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export const LogoContainer = styled.div`
  position: relative;
  z-index: 10;
  text-align: start;
  height: 55px;
  width: 311px;
`

export const PageContent = styled.div`
  position: relative;
  color: white;
  width: 100%;
  height: 100%;
  padding-top: 42px;
  padding: 42px 110px 0 110px;
`

export const LeftSpotlightWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
`

export const MiddleSmallSpotlightWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`

export const RightSpotlightWrapper = styled.div`
  width: 40%;
  height: 40%;
  position: absolute;
  right: 0;
`
