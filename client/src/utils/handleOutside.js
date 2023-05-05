function wrapper(elementRef, toggleFunction, excludeArray = []) {
  function handleClickOutside(event) {
    const exclude = excludeArray.some((elem) => {
      return elem.current && elem.current.contains(event.target)
    })
    if (
      elementRef.current &&
      !elementRef.current.contains(event.target) &&
      !exclude
    ) {
      toggleFunction(false)
    }
  }

  document.addEventListener('mousedown', handleClickOutside)
  return () => {
    document.removeEventListener('mousedown', handleClickOutside)
  }
}

export default wrapper
