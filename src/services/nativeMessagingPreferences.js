/**
 * Get/set native messaging preference in localStorage
 */
export const getNativeMessagingEnabled = () =>
  localStorage.getItem('native-messaging-enabled') === 'true'

export const setNativeMessagingEnabled = (enabled) => {
  if (enabled) {
    localStorage.setItem('native-messaging-enabled', 'true')
  } else {
    localStorage.removeItem('native-messaging-enabled')
  }
}
