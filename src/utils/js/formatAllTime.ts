export const formatAllTime = (currentTasksTime: number): string => {
  let formatTime: string = '';

  if (currentTasksTime < 60) {
    if (currentTasksTime * 10 % 10 === 0) {
      formatTime = `${currentTasksTime} мин`;
    } else {
      formatTime = `${currentTasksTime.toFixed(2).toString()} мин`;
    }

  } else if (currentTasksTime%60 !== 0) {
    formatTime = `${Math.floor(currentTasksTime / 60)} час ${(currentTasksTime%60)} мин`;
  } else {
    formatTime = `${Math.floor(currentTasksTime / 60)} час`;
  }
  return formatTime;
}
