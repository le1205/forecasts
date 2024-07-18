import { TimeFormat } from 'store';

export const getHumanTime: (timestamp:number, timezone:number, type: TimeFormat) => string = (timestamp, timezone, type) => {
  const date = new Date((timestamp + timezone) * 1000);

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  if (type === TimeFormat.Full) {
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    
    return `${formattedHours}:${formattedMinutes}`;
  } else {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
}