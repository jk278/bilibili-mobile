export function initViewport () {
  if (document.head) {
    const viewport = document.createElement('meta')
    viewport.setAttribute('name', 'viewport')
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0')
    document.head.appendChild(viewport)
  }
}
