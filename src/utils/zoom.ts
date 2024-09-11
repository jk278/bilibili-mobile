// zoom.ts
export function touchZoomWrap(zoomWrap: HTMLElement) {
  if (zoomWrap) {
    let initialDistance = 0
    let initialScale = 1
    console.log('Here')

    const calculateDistance = (touches: TouchList): number => {
      const dx = touches[0].clientX - touches[1].clientX
      const dy = touches[0].clientY - touches[1].clientY
      return Math.sqrt(dx * dx + dy * dy)
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        initialDistance = calculateDistance(event.touches)
        const scaleMatch = zoomWrap.style.transform.match(/scale\(([0-9.]+)\)/)
        initialScale = scaleMatch ? +scaleMatch[1] : 1 // 解析当前缩放比例
        zoomWrap.addEventListener('touchmove', handleTouchMove)
      }
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        const currentDistance = calculateDistance(event.touches)
        const scale = initialScale * (currentDistance / initialDistance)
        zoomWrap.style.cssText = `transform: scale(${scale}) !important`
        event.preventDefault() // 防止默认行为
      }
    }

    const handleTouchEnd = () => {
      // 可以根据需求处理结束事件
      // 例如：如果缩放结束后需要保存状态等
      zoomWrap.addEventListener('touchend', handleTouchMove)
    }

    zoomWrap.addEventListener('touchstart', handleTouchStart)
    zoomWrap.addEventListener('touchend', handleTouchEnd)
  }
}
