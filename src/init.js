export function initViewport () {
  const viewport = Object.assign(document.createElement('meta'), {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0'
  })
  document.head.appendChild(viewport)

  // body、video、leftContainer 皆为样式修改后再显示
  const style = Object.assign(document.createElement('style'), {
    textContent: 'body {display:block !important;}'
  })
  setTimeout(() => { document.head.appendChild(style) }, 10)
}
