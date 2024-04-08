export function initViewport () {
  const viewport = Object.assign(document.createElement('meta'), {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0'
  })
  document.head.appendChild(viewport)

  const style = Object.assign(document.createElement('style'), {
    textContent: 'body {display:block !important;}'
  })
  document.head.appendChild(style)
}
