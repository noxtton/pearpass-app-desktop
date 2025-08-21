import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export const ImageContainer = styled.div`
  max-width: 550px;
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const LeftText = styled.div.attrs(({ className }) => ({
  className
}))`
  display: flex;
  flex-direction: column;
  gap: 20px;

  position: absolute;
  opacity: 0;
  left: 50px;
  top: 50%;
  transform: translateY(-20%);

  &.fade-in {
    animation: ${fadeIn} 1s forwards;
    animation-delay: 4s;
  }
`

export const LeftDescriptionText = styled.span`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 2.6vw;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  max-width: 730px;
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

export const DescriptionText = styled.span.attrs(({ className }) => ({
  className
}))`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Humble Nostalgia';
  font-size: 4vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &.fade-out {
    animation: ${fadeOut} 2.5s forwards;
    animation-delay: 2.5s;
  }
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

const moveRight = keyframes`
  0%   { transform: translate(-50%, -50%); }
  100% { transform: translate(50%, -50%); }
`

const levitateBounce = keyframes`
0%,100% {
  transform: translate(50%,-50%) translateY(0px);
}
50% {
  transform: translate(50%,-50%) translateY(-30px);
}
`
export const Video = styled.video.attrs(({ className }) => ({
  className
}))`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30vw;
  max-width: 100%;
  height: auto;
  object-fit: cover;
  transform: translate(-50%, -50%);

  &.animate {
    animation:
      ${moveRight} 2.5s forwards 2.5s,
      ${levitateBounce} 4s ease-in-out infinite 5s;
    animation-fill-mode: forwards;
  }
`
