import { useEffect } from 'react'

export const useOutsideClick = ({ ref, onOutsideClick }) => {
  useEffect(() => {
    const handleListener = (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        return
      }
      onOutsideClick(event)
    }

    document.addEventListener('mousedown', handleListener)
    document.addEventListener('touchstart', handleListener)

    return () => {
      document.removeEventListener('mousedown', handleListener)
      document.removeEventListener('touchstart', handleListener)
    }
  }, [])
}
