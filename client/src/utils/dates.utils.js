export const changeDateToIsoFormat = (date) => {
  const timezoneOffset = date.getTimezoneOffset() * 60000 // convert to milliseconds
  const formattedDate = new Date(date.getTime() - timezoneOffset)
    .toISOString()
    .slice(0, 10)
  return formattedDate
}
