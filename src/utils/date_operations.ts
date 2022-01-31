const datetime = require('date-and-time');

export function getDateTimeFromString(date: String, time?: String) {
  if (time) {
    const dateTimeStr = date + ' ' + time;
    return datetime.parse(dateTimeStr, 'YYYY/MM/DD HH:mm', false);
  }
  return datetime.parse(date, 'YYYY/MM/DD', true);
}

export function getDurationMin(date: String, startTime: String, endTime: String) {
  let startDate = getDateTimeFromString(date, startTime);
  let endDate = getDateTimeFromString(date, endTime);
  return datetime.subtract(endDate, startDate).toMinutes();
}
