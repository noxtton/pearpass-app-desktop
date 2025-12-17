import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      errorYellow: {
        mode1: string
      }
      errorRed: {
        mode1: string
      }
      white: {
        mode1: string
      }
    }
  }
}
