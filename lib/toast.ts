export const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
  const event = new CustomEvent('showToast', {
    detail: { message, type }
  })
  window.dispatchEvent(event)
}