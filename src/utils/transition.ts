/**
 * 处理元素的 transitionend 事件，并在指定的 CSS 属性名称的过渡结束时执行回调函数。
 *
 * @param {HTMLElement} element - 要监听 transitionend 事件的 HTML 元素。
 * @param {string} propertyName - 要监听的 CSS 属性名称。
 * @param {() => void} callback - 过渡结束时要执行的回调函数。
 */
export const handleTransitionEndOnce = (
  element: HTMLElement,
  propertyName: string,
  callback: () => void,
): void => {
  const handleTransitionEnd = (event: TransitionEvent) => {
    if (event.propertyName === propertyName) {
      callback()
      element.removeEventListener('transitionend', handleTransitionEnd)
    }
  }

  element.addEventListener('transitionend', handleTransitionEnd)
}
