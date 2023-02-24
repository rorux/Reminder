import { TWeekDay, THolidays, TMonthDays, TQuarter } from './types';
import { HOLIDAYS_2023 } from './constants';

export const DAY_MS = 60 * 60 * 24 * 1000;

export const getDaysBeforeHolidays = (array: Array<number>): Array<number> => {
  const dates: Array<number> = [];
  array.forEach((day) => {
    if (HOLIDAYS_2023.includes(day)) {
      if (day > 1641675600000) {
        let checkDay = day;
        let isHoliday = true;
        while (isHoliday) {
          checkDay -= DAY_MS;
          if (!HOLIDAYS_2023.includes(checkDay)) isHoliday = false;
        }
        dates.push(checkDay);
      }
    } else dates.push(day);
  });
  return dates;
};

export const getDaysAfterHolidays = (array: Array<number>): Array<number> => {
  const dates: Array<number> = [];
  array.forEach((day) => {
    if (HOLIDAYS_2023.includes(day)) {
      let checkDay = day;
      let isHoliday = true;
      while (isHoliday) {
        checkDay += DAY_MS;
        if (!HOLIDAYS_2023.includes(checkDay)) isHoliday = false;
      }
      dates.push(checkDay);
    } else dates.push(day);
  });
  return dates;
};

export const weeklyComputedDays = (
  weeklyWeekDay: TWeekDay,
  weeklyHolidays: THolidays,
  dateStart = Date.parse(String(new Date(2023, 0, 1))),
  dateEnd = Date.parse(String(new Date(2024, 0, 1)))
): Array<number> => {
  const dates = [];
  for (let day = dateStart; day < dateEnd; day += DAY_MS) {
    if (new Date(day).getDay() === +weeklyWeekDay) dates.push(day);
  }
  if (weeklyHolidays === 'holidaysNoMatter') {
    return dates;
  } else if (weeklyHolidays === 'beforeHoliday') {
    return getDaysBeforeHolidays(dates);
  } else if (weeklyHolidays === 'afterHoliday') {
    return getDaysAfterHolidays(dates);
  } else return dates;
};

export const monthlyComputedDays = (
  monthlyDay: TMonthDays,
  monthlyHolidays: THolidays,
  dateStart = Date.parse(String(new Date(2022, 0, 1))),
  dateEnd = Date.parse(String(new Date(2023, 0, 1)))
): Array<number> => {
  const dates = [];
  for (let day = dateStart; day < dateEnd; day += DAY_MS) {
    if (new Date(day).getDate() === +monthlyDay) dates.push(day);
  }
  if (monthlyHolidays === 'holidaysNoMatter') {
    return dates;
  } else if (monthlyHolidays === 'beforeHoliday') {
    return getDaysBeforeHolidays(dates);
  } else if (monthlyHolidays === 'afterHoliday') {
    return getDaysAfterHolidays(dates);
  } else return dates;
};

export const quarterlyComputedDays = (
  quarterlyMonths: TQuarter,
  quarterlyDay: TMonthDays,
  quarterlyHolidays: THolidays,
  dateStart = Date.parse(String(new Date(2022, 0, 1))),
  dateEnd = Date.parse(String(new Date(2023, 0, 1)))
): Array<number> => {
  const dates = [];
  for (let day = dateStart; day < dateEnd; day += DAY_MS) {
    if (quarterlyMonths === 'Янв, Апр, Июл, Окт') {
      if (
        new Date(day).getDate() === +quarterlyDay &&
        (new Date(day).getMonth() === 0 ||
          new Date(day).getMonth() === 3 ||
          new Date(day).getMonth() === 6 ||
          new Date(day).getMonth() === 9)
      )
        dates.push(day);
    } else if (quarterlyMonths === 'Фев, Май, Авг, Ноя') {
      if (
        new Date(day).getDate() === +quarterlyDay &&
        (new Date(day).getMonth() === 1 ||
          new Date(day).getMonth() === 4 ||
          new Date(day).getMonth() === 7 ||
          new Date(day).getMonth() === 10)
      )
        dates.push(day);
    } else if (quarterlyMonths === 'Мар, Июн, Сен, Дек') {
      if (
        new Date(day).getDate() === +quarterlyDay &&
        (new Date(day).getMonth() === 2 ||
          new Date(day).getMonth() === 5 ||
          new Date(day).getMonth() === 8 ||
          new Date(day).getMonth() === 11)
      )
        dates.push(day);
    } else throw Error('error data');
  }

  if (quarterlyHolidays === 'holidaysNoMatter') {
    return dates;
  } else if (quarterlyHolidays === 'beforeHoliday') {
    return getDaysBeforeHolidays(dates);
  } else if (quarterlyHolidays === 'afterHoliday') {
    return getDaysAfterHolidays(dates);
  } else return dates;
};
