import { DAY_MS } from '@utils/records/ComputedDays';

export const getCountDaysOnMonth = (year: number, month: number, firstDayThisMonth: Date) => {
  const firstDayNextMonth = month === 11 ? new Date(year + 1, 0, 1) : new Date(year, month + 1, 1);
  return Math.round(
    (Date.parse(String(firstDayNextMonth)) - Date.parse(String(firstDayThisMonth))) /
      1000 /
      3600 /
      24
  );
};

export const getDateParse = (date: Date, order: number, month: number | null = null) => {
  const dateParse = Date.parse(String(date)) + DAY_MS * order;
  if (month !== null) {
    const dateObj = new Date(dateParse);
    if (dateObj.getMonth() === month) return dateParse;
    else return null;
  } else return dateParse;
};

export const getTheFirstWeek = (first: Date) => {
  const firstWeekDay = first.getDay();
  const weekArray: Array<number | null> = [null, null, null, null, null, null, null];

  if (firstWeekDay === 0) weekArray[6] = getDateParse(first, 0);
  else {
    for (let i = firstWeekDay - 1, j = 0; i <= 6; i++, j++) {
      weekArray[i] = getDateParse(first, j);
    }
  }
  if (weekArray[6]) {
    const nextDay = new Date(weekArray[6] + DAY_MS);
    return { weekArray, nextDay };
  } else return { weekArray, nextDay: null };
};

export const getWeek = (first: Date | null) => {
  const thisMonth = first?.getMonth();
  const weekArray: Array<number | null> = [null, null, null, null, null, null, null];
  let nextDay: Date | null = null;

  if (first !== null) {
    let toDoEmpty = false;
    for (let i = 0; i <= 6; i++) {
      if (toDoEmpty) weekArray[i] = null;
      else {
        if (getDateParse(first, i, thisMonth) === null) {
          weekArray[i] = null;
          toDoEmpty = true;
        } else weekArray[i] = getDateParse(first, i, thisMonth);
      }
    }

    if (weekArray[6]) {
      const checkNextDay = new Date(weekArray[6] + DAY_MS);
      if (checkNextDay.getMonth() === thisMonth) nextDay = checkNextDay;
    }
  }

  return { weekArray, nextDay };
};
