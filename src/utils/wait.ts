export const waitDOMContentLoaded = (callback: () => void): void => {
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', callback)
  else callback()
}
