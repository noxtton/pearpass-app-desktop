/** @typedef {import('pear-interface')} */ /* global Pear */

let pipe

/**
 * @returns {Pipe} The Pear worker pipe.
 */
export const createOrGetPipe = () => {
  if (pipe) {
    return pipe
  }

  pipe = Pear.worker.run(
    Pear.config.applink +
      '/node_modules/pearpass-lib-vault-mobile/src/worklet/app.js'
  )

  Pear.teardown(() => {
    if (pipe) {
      pipe.end()
      pipe = null
    }
  })

  return pipe
}
