import styled from 'styled-components'

const AVATAR_CONTAINER_SIZE = '30px'

export const AvatarContainer = styled.div`
  position: relative;
  display: flex;
  height: ${({ size }) => (size === 'sm' ? '21px' : AVATAR_CONTAINER_SIZE)};
  aspect-ratio: 1/1;
  padding: 2.5px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ size }) => (size === 'sm' ? '7px' : '10px')};
  background: ${({ theme }) => theme.colors.secondary400.mode1};
`

export const AvatarAlt = styled.div`
  color: ${({ theme }) => theme.colors.primary400.mode1};
  text-align: center;
  font-family: 'Inter';
  font-size: ${({ size }) => (size === 'sm' ? '12px' : '16px')};
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

export const SelectedAvatarContainer = styled.div`
  display: flex;
  width: ${AVATAR_CONTAINER_SIZE};
  height: ${AVATAR_CONTAINER_SIZE};
  padding: 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary400.mode1};
`

export const Pin = styled.div`
  position: absolute;
  right: -3px;
  bottom: -4px;

  & > svg {
    fill: ${({ theme }) => theme.colors.primary400.mode1};
  }
`
