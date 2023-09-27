export default function dateFormat(date: string, mediaSmall?: boolean) {
  const newDate = new Date(date);
  if (mediaSmall) {
    return `${newDate.toLocaleDateString().toUpperCase()}`;
  } else {
    return `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }).toUpperCase()}`;
  }
}
