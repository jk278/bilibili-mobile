export const handleTransitionEndOnce = (element: HTMLElement,propertyName: string,callback: () => void): void => {
  const handleTransitionEnd = (event: TransitionEvent) => {
    if (event.propertyName === propertyName) {
      callback();
      element.removeEventListener('transitionend', handleTransitionEnd);
    }
  };

  element.addEventListener('transitionend', handleTransitionEnd);
};
