/**
 * 处理评论区图片的触摸事件
 *
 * @param zoomWrap - 缩放元素
 * @param photoShadow - 包含操作按钮的外框元素
 */
export function touchZoomWrap(zoomWrap: HTMLElement, photoShadow: ShadowRoot) {
  if (zoomWrap) {
    let initialDistance = 0
    let initialScale = 1
    let startX = 0
    let startY = 0
    let initialTransformX = 0
    let initialTransformY = 0
    let isSingleFinger = false
    let isTwoFingerZooming = false
    let touchCount = 0
    // console.log('Here')

    const calculateDistance = (touches: TouchList): number => {
      const dx = touches[0].clientX - touches[1].clientX
      const dy = touches[0].clientY - touches[1].clientY
      return Math.sqrt(dx * dx + dy * dy)
    }

    const handleTouchStart = (event: TouchEvent) => {
      touchCount++
      if (zoomWrap.style.cssText.match(/scale3d\(1, 1, 1\)/)) {
        zoomWrap.style.cssText =
          'transform: scale(1) translate(0px, 0px) !important;'
      }

      if (event.touches.length === 2) {
        isSingleFinger = false
        isTwoFingerZooming = true
        initialDistance = calculateDistance(event.touches)
      } else if (event.touches.length === 1) {
        isSingleFinger = true
        startX = event.changedTouches[0].clientX
        startY = event.changedTouches[0].clientY
      }

      initialTransformX = +zoomWrap.style.transform.match(
        /translate\((-?[0-9.]+)px, -?[0-9.]+px\)/,
      )![1]
      initialTransformY = +zoomWrap.style.transform.match(
        /translate\(-?[0-9.]+px, (-?[0-9.]+)px\)/,
      )![1] // 解析当前偏移
      initialScale = +zoomWrap.style.transform.match(/scale\(([0-9.]+)\)/)![1] // 解析当前缩放比例
      zoomWrap.addEventListener('touchmove', handleTouchMove)
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (isTwoFingerZooming) {
        const currentDistance = calculateDistance(event.touches)
        const preScale = initialScale * (currentDistance / initialDistance)
        let scale
        if (preScale < 1) {
          scale = 1
          zoomWrap.style.cssText = zoomWrap.style.cssText.replace(
            /translate\(-?[0-9.]+px, -?[0-9.]+px\)/,
            `translate(0px, 0px)`,
          )
        } else {
          scale = preScale
        }

        zoomWrap.style.cssText = zoomWrap.style.cssText.replace(
          /scale\([0-9.]+\)/,
          `scale(${scale})`,
        )

        event.preventDefault() // 防止默认行为
      } else {
        if (initialScale > 1.05) {
          // 防止未还原到位
          const deltaX =
            (event.changedTouches[0].clientX - startX) / initialScale
          const deltaY =
            (event.changedTouches[0].clientY - startY) / initialScale

          zoomWrap.style.cssText = zoomWrap.style.cssText.replace(
            /translate\(-?[0-9.]+px, -?[0-9.]+px\)/,
            `translate(${initialTransformX + deltaX}px, ${initialTransformY + deltaY}px)`,
          )
        }
      }
    }

    const handleTouchEnd = (event: TouchEvent) => {
      touchCount--
      zoomWrap.removeEventListener('touchend', handleTouchMove)
      if (isSingleFinger) {
        if (initialScale < 1.05) {
          const offsetX = event.changedTouches[0].clientX - startX
          const offsetY = event.changedTouches[0].clientY - startY

          if (Math.abs(offsetX) > 55 && Math.abs(offsetY / offsetX) < 1 / 2) {
            if (offsetX > 0) {
              ;(photoShadow.querySelector('#prev') as HTMLElement)?.click()
            } else {
              ;(photoShadow.querySelector('#next') as HTMLElement)?.click()
            }
          }
        }
      }
      if (touchCount === 0) {
        isTwoFingerZooming = false
      }
    }
    zoomWrap.addEventListener('touchstart', handleTouchStart)
    zoomWrap.addEventListener('touchend', handleTouchEnd)
  }
}
