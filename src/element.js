export function createUnfoldBtn () {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      // 遍历此次观察到的添加节点
      Array.from(mutation.addedNodes).forEach(addedNode => {
        // Log addedNode 和 addedNode.nodeType, nodeType 为 1 表示 Node.ELEMENT_NODE
        if (addedNode.classList.contains('bili-im')) {
          createElement()
          observer.disconnect()
        }
      })
    })
  })

  observer.observe(document.querySelector('body>.container'), { childList: true, subtree: true })

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
