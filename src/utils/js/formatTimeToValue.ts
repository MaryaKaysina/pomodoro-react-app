export function formatTimeToValue(time: number) {
  const timeValue = +(time / 60).toFixed(2);
  return timeValue.toString();
}
