export function waitDOMContentLoaded(callback: () => void): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback(); 
  }
}

export const handleTransitionEndOnce = (element: HTMLElement,propertyName: string,callback: () => void): void => {
  const handleTransitionEnd = (event: TransitionEvent) => {
    if (event.propertyName === propertyName) {
      callback();
      element.removeEventListener('transitionend', handleTransitionEnd);
    }
  };

  element.addEventListener('transitionend', handleTransitionEnd);
};
