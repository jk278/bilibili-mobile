export function initViewport () {
  if (document.head) {
    function addViewportMeta () {
      const viewport = document.createElement('meta')
      viewport.setAttribute('name', 'viewport')
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0')
      document.head.appendChild(viewport)
    }

    addViewportMeta()

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          if (node.nodeName === 'META' && node.getAttribute('name') === 'viewport') {
            addViewportMeta()
          }
        })
      })
    })

    observer.observe(document.head, {
      childList: true
    })
  }
}
