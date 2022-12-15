export function formatDate(date: Date) {
  const day = date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate();

  const month = (date.getUTCMonth() + 1) < 10 ?
    '0' + (date.getUTCMonth() + 1) :
    (date.getUTCMonth() + 1);

  const year = date.getUTCFullYear();
  return `${year}-${month}-${day}`;
};

export function getWeek(currenWeek: number = 0) {
  const now = new Date(new Date().setDate(new Date().getDate() - currenWeek * 7));

  const offset = [6, 0, 1, 2, 3, 4, 5];
  const week: string[] = [];

  const mondayStr = new Date(now.setDate(now.getDate() - offset[now.getDay()]));

  week.push(formatDate(mondayStr));
  for (let i = 0; i < 6; i++) {
    const day = new Date(mondayStr.setDate(mondayStr.getDate() + 1));
    week.push(formatDate(day));
  }
  return week;
}
