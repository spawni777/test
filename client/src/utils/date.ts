const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December'
];

export const getCurrentFormattedDate = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
  const timeZoneOffset = -now.getTimezoneOffset() / 60; // Get the offset in hours

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}+${timeZoneOffset}`;
}

export const parseFormattedDate = (inputDate: string | number) => {
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  return {year, month, day};
}

const groupDateDelimiter = ' ‘';
export const getGroupDate = (inputDate: string | number) => {
  const {day, month, year} = parseFormattedDate(inputDate);
  const yearMonthDay = [year, month.charAt(0).toUpperCase() + month.slice(1), day];

  return yearMonthDay.join(groupDateDelimiter);
}

export const getTimestampOfGroupDate = (groupDate: string) => {
  const [year, month, day] = groupDate.split(groupDateDelimiter);
  const monthIndex = months.indexOf(month);
  const date = new Date(parseInt(year), monthIndex, parseInt(day));

  return date.getTime();
}
