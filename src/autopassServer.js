import { AutopassHttpServer } from 'pearpass-lib-vault-desktop'

import { logger } from './utils/logger'

/**
 * @type {AutopassHttpServer}
 */
export let autopassServerInstance

/**
 * @param {string} storagePath
 * @param {{ debugMode?: boolean, port?: number }} opts
 * @returns {Promise<AutopassHttpServer>}
 */
export async function startServer(storagePath, port) {
  if (autopassServerInstance?.isListening()) {
    logger.log(
      'Autopass HTTP server is already running. Please stop it before starting a new instance.'
    )
    return
  }

  autopassServerInstance = new AutopassHttpServer(storagePath, {
    debugMode: true
  })

  const addressData = await autopassServerInstance.listen(port)

  logger.log(
    `Autopass HTTP server listening on ${addressData.address}:${addressData.port}`
  )

  return autopassServerInstance
}

export const stopServer = async () => {
  if (!autopassServerInstance?.isListening()) {
    logger.log('Autopass HTTP server is not running.')
    return
  }

  await autopassServerInstance.close()

  logger.log('Autopass HTTP server stopped.')

  autopassServerInstance = null
}

export const isServerRunning = () =>
  autopassServerInstance?.isListening() || false

export const getLocalstoragePort = () =>
  localStorage.getItem('http-server-port')

export const setLocalstoragePort = (port) => {
  localStorage.setItem('http-server-port', port)
}

export const removeLocalstoragePort = () => {
  localStorage.removeItem('http-server-port')
}
