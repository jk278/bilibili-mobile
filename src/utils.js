export function waitDOMContentLoaded (callback) {
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback()
}

export const handleTransitionEndOnce = (element, propertyName, callback) => {
  const handleTransitionEnd = ({ propertyName: prop }) => {
    if (prop === propertyName) {
      callback()
      element.removeEventListener('transitionend', handleTransitionEnd)
    }
  }

  element.addEventListener('transitionend', handleTransitionEnd)
}
