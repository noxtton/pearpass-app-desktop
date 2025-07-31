import { useEffect } from 'react'

import { RuntimeLoader } from '@rive-app/canvas'
import { useRive } from '@rive-app/react-canvas'
import { html } from 'htm/react'

RuntimeLoader.setWasmUrl('assets/rive/rive.wasm')

export const CategoryAnimation = () => {
  const { RiveComponent, rive } = useRive({
    src: 'assets/animations/category_.riv',
    autoplay: false,
    animations: ['Timeline 1']
  })

  useEffect(() => {
    if (rive && rive.loaded) {
      const names = rive.animationNames

      if (names.length > 0) {
        rive.play(names[0])
      }
    }
  }, [rive])

  return html`<${RiveComponent}
    onMouseEnter=${() => rive && rive.play()}
    onMouseLeave=${() => rive && rive.pause()}
    style=${{ width: '100%', aspectRatio: '1 / 1' }}
  />`
}
