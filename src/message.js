export function createUnfoldBtn () {
  const observer = new MutationObserver(mutations =>
    mutations.forEach(mutation => {
    // innerHTML 属性可一次性插入多个节点。此处 mutation.addedNodes.length 为 0 或 1。非数组使用 for...of 循环。
    // addedNode.nodeType 为 1 表示 Node.ELEMENT_NODE
      if (mutation.addedNodes[0]?.classList.contains('bili-im')) {
        createElement()
        observer.disconnect()
      }
    })
  )
  const messageContainer = document.querySelector('body>.container')
  observer.observe(messageContainer, { childList: true, subtree: true })

  function createElement () {
    const unfoldBtn = Object.assign(document.createElement('div'), {
      id: 'unfold-btn',
      textContent: '展开'
    })
    const messageList = document.querySelector('.bili-im .left')
    messageList.appendChild(unfoldBtn)

    unfoldBtn.addEventListener('click', () => {
      if (messageList.style.cssText === '') {
        messageList.style.cssText = 'width: 240px !important'
        unfoldBtn.textContent = '折叠'
      } else {
        messageList.style.cssText = ''
        unfoldBtn.textContent = '展开'
      }
    })
  }
}
