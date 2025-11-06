/** @typedef {import('pear-interface')} */ /* global Pear */
/* eslint-disable no-console */

// Disable all console output in production builds.
// We consider production when a Pear app key is present (Pear.config.key),
// or when NODE_ENV explicitly equals 'production'.
const isProduction =
  (typeof Pear !== 'undefined' && !!Pear.config?.key) ||
  (typeof process !== 'undefined' &&
    process.env &&
    process.env.NODE_ENV === 'production')
const METHODS = ['log', 'info', 'warn', 'debug', 'error']

if (isProduction && typeof console !== 'undefined') {
  const noop = () => {}

  for (const method of METHODS) {
    try {
      // Overwrite with a noop, but keep writable/configurable so libs that assign do not crash
      Object.defineProperty(console, method, {
        value: noop,
        writable: true,
        configurable: true
      })
    } catch {
      // Fallback assignment if defineProperty fails
      console[method] = noop
    }
  }
}
export function lockConsoleMethods() {
  if (!isProduction || typeof console === 'undefined') return

  for (const method of METHODS) {
    try {
      Object.defineProperty(console, method, {
        value: console[method],
        writable: false,
        configurable: false
      })
    } catch {}
  }

  try {
    Object.seal(console)
  } catch {}
}
