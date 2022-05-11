export const debounce = (func, delay = 400) => {
  let timeout = null
  return arg => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(arg)
    }, delay)
  }
}
