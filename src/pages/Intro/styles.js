import styled, { keyframes } from 'styled-components'

export const BlackBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme, pageIndex }) =>
    pageIndex === 0 || pageIndex === 5 ? '#010702' : theme.colors.black.mode1};
  color: ${({ theme }) => theme.colors.white.mode1};
  padding: 40px 50px;
  /* background-image: ${({ hasImageBackground }) =>
    hasImageBackground ? 'url(assets/images/pearBackground.png)' : 'none'}; */
`

export const GradientBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LogoContainer = styled.div`
  display: flex;
  flex: 0 0 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20vw;
  z-index: 1;
  scale: ${({ size }) => (size === 'md' ? 1 : 0.6)};
`

export const WelcomeText = styled.span`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Humble Nostalgia';
  font-size: 4vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const ButtonContainer = styled.div.attrs(({ className }) => ({
  className
}))`
  flex: 0 0 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  opacity: 0;

  &.fade-in {
    animation: ${fadeIn} 2.5s forwards;
    animation-delay: 2.5s;
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30%;
`

export const StrongText = styled.span`
  font-weight: 400;
`

const levitateBounce = keyframes`
  0%   { transform: translateY(0); }
  25%  { transform: translateY(-20px); }
  50%  { transform: translateY(0); }
  75%  { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`

export const pear3dLockImage = styled.img`
  animation: ${levitateBounce} 2.5s ease-in-out infinite;
`
export const LastPageContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 20px;
`

export const LastPageDescription = styled.span`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Humble Nostalgia';
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

export const Video = styled.video`
  width: 30vw;
  max-width: 100%;
  height: auto;
  object-fit: cover;
`
