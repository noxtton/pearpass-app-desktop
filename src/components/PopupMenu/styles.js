import styled from 'styled-components'

export const MenuWrapper = styled.div`
  position: relative;
  display: inline-block;
`

export const MenuCard = styled.div.withConfig({
  shouldForwardProp: (prop) => !['side', 'align'].includes(prop)
})`
  position: absolute;
  z-index: 1000;
  bottom: -10px;

  ${({ side }) => {
    switch (side) {
      case 'left':
        return 'left: 0;'
      case 'center':
        return 'left: 50%;'
      case 'right':
        return 'left: 100%;'
    }
  }};

  & > div {
    ${({ align }) => {
      switch (align) {
        case 'left':
          return 'transform: translateX(0);'
        case 'center':
          return 'transform: translateX(-50%);'
        case 'right':
          return 'transform: translateX(-100%);'
      }
    }}
  }
`

export const MenuTrigger = styled.div`
  cursor: pointer;
`
