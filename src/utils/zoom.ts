// zoom.ts
export function touchZoomWrap(zoomWrap: HTMLElement, photoShadow: HTMLElement) {
  if (zoomWrap) {
    let initialDistance = 0
    let initialScale = 1
    let isSingleFinger = false
    let startX = 0
    let startY = 0
    let initialTransformX = 0
    let initialTransformY = 0
    let singleFingerTimer = 0
    console.log('Here')

    zoomWrap.style.cssText = 'transform: scale(1) translate(0,0) !important;'

    const calculateDistance = (touches: TouchList): number => {
      const dx = touches[0].clientX - touches[1].clientX
      const dy = touches[0].clientY - touches[1].clientY
      return Math.sqrt(dx * dx + dy * dy)
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        clearTimeout(singleFingerTimer)
        initialDistance = calculateDistance(event.touches)
      } else if (event.touches.length === 1) {
        singleFingerTimer = setTimeout(() => {
          isSingleFinger = true
          startX = event.changedTouches[0].clientX
          startY = event.changedTouches[0].clientY
        }, 300)
      }

      initialTransformX = +zoomWrap.style.transform.match(
        /transform\(([0-9.])+,[0-9.]\)/,
      )![1]
      initialTransformY = +zoomWrap.style.transform.match(
        /transform\([0-9.]+,([0-9.])\)/,
      )![1] // 解析当前偏移
      initialScale = +zoomWrap.style.transform.match(/scale\(([0-9.]+)\)/)![1] // 解析当前缩放比例
      zoomWrap.addEventListener('touchmove', handleTouchMove)
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        const currentDistance = calculateDistance(event.touches)
        const preScale = initialScale * (currentDistance / initialDistance)
        let scale
        if (preScale < 1) {
          scale = 1
          zoomWrap.style.cssText = zoomWrap.style.cssText.replace(
            /transform\([0-9.]+,[0-9.]+\)/,
            `transform(0,0)`,
          )
        } else {
          scale = preScale
        }

        zoomWrap.style.cssText = zoomWrap.style.cssText.replace(
          /scale\([0-9.]+\)/,
          `scale(${scale})`,
        )

        event.preventDefault() // 防止默认行为
      } else if (event.touches.length === 1) {
        if (initialScale > 1) {
          const deltaX = event.changedTouches[0].clientX - startX
          const deltaY = event.changedTouches[0].clientY - startY

          zoomWrap.style.cssText = zoomWrap.style.cssText.replace(
            /transform\([0-9.]+,[0-9.]+\)/,
            `transform(${initialTransformX + deltaX},${initialTransformY + deltaY})`,
          )
        }
      }
    }

    const handleTouchEnd = (event: TouchEvent) => {
      zoomWrap.addEventListener('touchend', handleTouchMove)
      if (isSingleFinger) {
        if (initialScale === 1) {
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
    }
    zoomWrap.addEventListener('touchstart', handleTouchStart)
    zoomWrap.addEventListener('touchend', handleTouchEnd)
  }
}
