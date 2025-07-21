import { useEffect, useState } from 'react'

import { html } from 'htm/react'

import { Container } from './styles'
import { InputPearpassPassword } from '../../../components/InputPearpassPassword'
import { NoticeContainer } from '../../../components/NoticeContainer'

export const PasswordFillAnimation = () => {
  const [value, setValue] = useState('')
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const targetPassword = 'supersecret'
    let i = 0
    let current = ''
    let interval

    if (isAnimating) {
      interval = setInterval(() => {
        if (i >= targetPassword.length) {
          clearInterval(interval)
          setIsAnimating(false)
          return
        }

        current += targetPassword[i]
        setValue(current)
        i++
      }, 100)
    }

    return () => clearInterval(interval)
  }, [isAnimating])

  return html`
    <${Container}>
      <${InputPearpassPassword}
        isDisabled=${true}
        isFilled=${!isAnimating}
        value=${value}
      />
      <${NoticeContainer} text="Pearpass cannot recover lost passwords." />
    <//>
  `
}
