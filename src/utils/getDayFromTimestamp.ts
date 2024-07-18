export const getDayFromTimestamp:(timestamp:number, timezone:number) => string = (timestamp, timezone) => {
  const date = new Date((timestamp + timezone) * 1000);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayIndex = date.getUTCDay();

  return days[dayIndex];
}