/**
 * 动态修改播放组件样式
 * @param {boolean} isDynamicRefresh - 是否动态刷新
 */
export function modifyShadowDOMLate(isDynamicRefresh) {
  let commentsShadow
  let commentsHeaderShadow
  let headerBoxShadow

  // 初始化动态要获胜 #comment，第一次变化删除.comment增加.comment，第二次添加bili-comments
  const comment = document.getElementById('commentapp')
  const observer = new MutationObserver(handleCommentMutation)
  observer.observe(comment, { childList: true, subtree: true })

  function handleCommentMutation(mutations) {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.nodeName.toLowerCase() === 'bili-comments'
        ) {
          observeComments()
          observer.disconnect()
        }
      })
    })
  }

  function observeComments() {
    commentsShadow = document.querySelector('bili-comments').shadowRoot
    const observer = new MutationObserver(handleCommentsMutation)
    observer.observe(commentsShadow, { childList: true, subtree: true })

    appendStyle(
      commentsShadow,
      `
        div#contents {
          padding-top: 0;
        }`,
    )
  }

  function handleCommentsMutation(mutations) {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.id === 'contents') {
          observeHeader()
          observeContent()
          observer.disconnect()
        }
      })
    })
  }

  // --------------------
  // header
  function observeHeader() {
    commentsHeaderShadow = commentsShadow.querySelector(
      'bili-comments-header-renderer',
    ).shadowRoot
    const observer = new MutationObserver(handleHeaderMutation)
    observer.observe(commentsHeaderShadow, { childList: true, subtree: true })

    // 修复评论行概率性异常
    appendStyle(
      commentsHeaderShadow,
      `
        div#commentbox {
          position: fixed;
          left: 0;
          bottom: var(--actionbar-height);
          z-index: 10;
          background: white;
          width: calc(100% - 24px);
          padding: 8px 12px;
          border-top: 1px solid var(--line_regular);
          transition: calc(var(--actionbar-time)*1.40) ease-in;
          display: var(--commentbox-display);
          transform: var(--shadow-transform);
        }
        div#commentbox[style] {
          display: none;
        }
        div#commentbox[style]+.bili-comments-bottom-fixed-wrapper {
          bottom: var(--actionbar-height) !important;
        }
        div#commentbox[style]+.bili-comments-bottom-fixed-wrapper>div {
          padding: 8px 12px !important;
          width: calc(100% - 24px) !important;
          transition: calc(var(--actionbar-time)* 1.40) ease-in;
          display: var(--commentbox-display);
          transform: var(--shadow-transform);
        }
        div#navbar {
          margin-bottom: 0;
        }
        #notice {
          display: none;
        }`,
    )
  }

  function handleHeaderMutation(mutations) {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.nodeName.toLowerCase() === 'div' &&
          node.id === 'commentbox'
        ) {
          observeHeader2()
          observer.disconnect()
        }
      })
    })
  }

  function observeHeader2() {
    headerBoxShadow =
      commentsHeaderShadow.querySelector('bili-comment-box').shadowRoot
    const observer = new MutationObserver(handleHeader2Mutation)
    observer.observe(headerBoxShadow, { childList: true, subtree: true })

    appendStyle(
      headerBoxShadow,
      `
        :host {
          display: var(--commentbox-display) !important;
        }
        div#user-avatar {
          display: none;
        }
        div#comment-area {
          width: 100%;
        }
        div#editor {
          border-radius: 13px;
          padding: 0;
        }`,
    )

    const headerVote = commentsHeaderShadow.querySelector(
      'bili-comments-vote-card',
    )
    if (headerVote) {
      appendStyle(
        headerVote.shadowRoot,
        `.option.left,
        .option.right {
          min-width: 0 !important;
        }
        #card {
          padding-top: 27px !important;
        }
        #info {
          transform: translateY(-23px);
        }
        #title {
          overflow: visible !important;
          white-space: nowrap;
          position: absolute;
        }
        #desc {
          padding-top: 20px;
        }`,
      )
    }
  }

  function handleHeader2Mutation(mutations) {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.nodeName.toLowerCase() === 'div' &&
          node.id === 'comment-area'
        ) {
          observeHeader3()
          observer.disconnect()
        }
      })
    })
  }

  function observeHeader3() {
    // list 还是 bili-comment-textarea
    const oldTextarea = headerBoxShadow.querySelector('bili-comment-textarea')

    const textarea = oldTextarea
      ? oldTextarea
      : headerBoxShadow.querySelector('bili-comment-rich-textarea')

    if (oldTextarea) {
      appendStyle(
        textarea.shadowRoot,
        `textarea#input {
            line-height: 26px;
            min-height: 26px;
            height: 26px !important;
          }`,
      )
    } else {
      appendStyle(
        textarea.shadowRoot,
        `div#input, div.brt-root {
        line-height: 26px;
        min-height: 26px;
        --brt-line-height: 26px;
      }`,
      )
    }
  }

  // --------------------
  // content
  function observeContent() {
    const commentThreads = commentsShadow.querySelectorAll(
      'bili-comment-thread-renderer',
    )
    commentThreads.forEach((thread) => {
      const threadShadow = thread.shadowRoot
      const observer = new MutationObserver(handleContentMutation)
      observer.observe(threadShadow, { childList: true, subtree: true })
    })
  }

  function handleContentMutation(mutations) {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.nodeName.toLowerCase() === 'div' &&
          node.id === 'replies'
        ) {
          observeContent2(mutation.target)
          observer.disconnect()
        }
      })
    })
  }

  function observeContent2(threadShadow) {
    const commentShadow = threadShadow.querySelector(
      'bili-comment-renderer',
    ).shadowRoot
    const repliesShadow = threadShadow.querySelector(
      'bili-comment-replies-renderer',
    ).shadowRoot

    appendStyle(
      commentShadow,
      `
        div#body {
          padding-left: 45px;
          --bili-comment-hover-more-display: block;
        }
        a#user-avatar {
          left: 0;
        }`,
    )

    appendStyle(
      repliesShadow,
      `
        div#expander {
          padding-left: 40px;
        }`,
    )

    const observer = new MutationObserver(handleCommentShadowMutation)
    observer.observe(commentShadow, { childList: true, subtree: true })

    const observer2 = new MutationObserver(handleRepliesShadowMutation)
    observer2.observe(repliesShadow, { childList: true, subtree: true })
  }

  function handleCommentShadowMutation(mutations) {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.nodeName.toLowerCase() === 'div' &&
          node.id === 'body'
        ) {
          const avatarShadow =
            mutation.target.querySelector('bili-avatar').shadowRoot
          appendStyle(
            avatarShadow,
            `
              .layer.center {
                width: 48px !important;
                height: 48px !important;
              }`,
          )
          observer.disconnect()
        }
      })
    })
  }

  function handleRepliesShadowMutation(mutations) {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.nodeName.toLowerCase() === 'div' &&
          node.id === 'expander'
        ) {
          const replies = mutation.target.querySelectorAll(
            'bili-comment-reply-renderer',
          )
          replies.forEach((reply) => {
            const replyShadow = reply.shadowRoot
            appendStyle(
              replyShadow,
              `
                div#body {
                  padding: 4px 0 4px 29px;
                  --bili-comment-hover-more-display: block;
                }`,
            )
            observer.disconnect()
          })
        }
      })
    })
  }

  function appendStyle(shadowRoot, cssText) {
    const style = document.createElement('style')
    style.textContent = cssText
    shadowRoot.appendChild(style)
  }

  if (isDynamicRefresh) {
    return
  }

  // 评论区图片
  new MutationObserver(handleBodyMutation).observe(document.body, {
    childList: true,
  })

  function handleBodyMutation(mutations) {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.nodeName.toLowerCase() === 'bili-photoswipe'
        ) {
          node.addEventListener(
            'touchmove',
            (event) => {
              event.stopImmediatePropagation() // 禁用阻止缩放的事件
            },
            true,
            { once: true },
          )

          const photoShadow = node.shadowRoot
          appendStyle(
            photoShadow,
            `
              #prev, #next, #close {
                top: calc(100% - 120px) !important;
              }
              #close {
                right: 50% !important;
                transform: translate(50%, -50%);
              }`,
          )
        }
      })
    })
  }
}
