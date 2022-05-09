export const getDateString = (begin = true) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDate().toString().padStart(2, "0")
  if (month < 9) {
    return begin
      ? `${year - 1}-0${month + 1}-${day}T00:00`
      : `${year - 1}-0${month + 1}-${day}T23:59`
  }
  return begin
    ? `${year - 1}-${month + 1}-${day}T00:00`
    : `${year - 1}-${month + 1}-${day}T23:59`
}
