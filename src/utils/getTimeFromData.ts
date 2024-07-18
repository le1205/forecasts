export const getFullTimeFormat: (date: Date) => string = (date) => {
  return date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0')
}

export const getMeridiemTimeFormat: (date: Date) => string = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}