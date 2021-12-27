export const PERIOD = [
  { value: 'weekly', name: 'Еженедельно' },
  { value: 'monthly', name: 'Ежемесячно' },
  { value: 'quarterly', name: 'Ежеквартально' },
];

export const WEEKDAY = [
  { value: '1', name: 'Понедельник' },
  { value: '2', name: 'Вторник' },
  { value: '3', name: 'Среда' },
  { value: '4', name: 'Четверг' },
  { value: '5', name: 'Пятница' },
  { value: '6', name: 'Суббота' },
  { value: '0', name: 'Воскресенье' },
];

export const HOLIDAYS = [
  { value: 'holidaysNoMatter', name: 'Праздники и выходные не влияют' },
  { value: 'beforeHoliday', name: 'Перенос на первый рабочий день ДО' },
  { value: 'afterHoliday', name: 'Перенос на первый рабочий день ПОСЛЕ' },
];

export const MONTH_DAYS = [
  { value: '1', name: '1' },
  { value: '2', name: '2' },
  { value: '3', name: '3' },
  { value: '4', name: '4' },
  { value: '5', name: '5' },
  { value: '6', name: '6' },
  { value: '7', name: '7' },
  { value: '8', name: '8' },
  { value: '9', name: '9' },
  { value: '10', name: '10' },
  { value: '11', name: '11' },
  { value: '12', name: '12' },
  { value: '13', name: '13' },
  { value: '14', name: '14' },
  { value: '15', name: '15' },
  { value: '16', name: '16' },
  { value: '17', name: '17' },
  { value: '18', name: '18' },
  { value: '19', name: '19' },
  { value: '20', name: '20' },
  { value: '21', name: '21' },
  { value: '22', name: '22' },
  { value: '23', name: '23' },
  { value: '24', name: '24' },
  { value: '25', name: '25' },
  { value: '26', name: '26' },
  { value: '27', name: '27' },
  { value: '28', name: '28' },
  { value: '29', name: '29' },
  { value: '30', name: '30' },
  { value: '31', name: '31' },
];

export const QUARTER = [
  { value: '1', name: 'Янв, Апр, Июл, Окт' },
  { value: '2', name: 'Фев, Май, Авг, Ноя' },
  { value: '3', name: 'Мар, Июн, Сен, Дек' },
];

export const HOLIDAYS_2022 = [
  Date.parse(String(new Date(2022, 0, 1))),
  Date.parse(String(new Date(2022, 0, 2))),
  Date.parse(String(new Date(2022, 0, 3))),
  Date.parse(String(new Date(2022, 0, 4))),
  Date.parse(String(new Date(2022, 0, 5))),
  Date.parse(String(new Date(2022, 0, 6))),
  Date.parse(String(new Date(2022, 0, 7))),
  Date.parse(String(new Date(2022, 0, 8))),
  Date.parse(String(new Date(2022, 0, 9))),
  Date.parse(String(new Date(2022, 0, 15))),
  Date.parse(String(new Date(2022, 0, 16))),
  Date.parse(String(new Date(2022, 0, 22))),
  Date.parse(String(new Date(2022, 0, 23))),
  Date.parse(String(new Date(2022, 0, 29))),
  Date.parse(String(new Date(2022, 0, 30))),
  Date.parse(String(new Date(2022, 1, 5))),
  Date.parse(String(new Date(2022, 1, 6))),
  Date.parse(String(new Date(2022, 1, 12))),
  Date.parse(String(new Date(2022, 1, 13))),
  Date.parse(String(new Date(2022, 1, 19))),
  Date.parse(String(new Date(2022, 1, 20))),
  Date.parse(String(new Date(2022, 1, 23))),
  Date.parse(String(new Date(2022, 1, 26))),
  Date.parse(String(new Date(2022, 1, 27))),
  Date.parse(String(new Date(2022, 2, 6))),
  Date.parse(String(new Date(2022, 2, 7))),
  Date.parse(String(new Date(2022, 2, 8))),
  Date.parse(String(new Date(2022, 2, 12))),
  Date.parse(String(new Date(2022, 2, 13))),
  Date.parse(String(new Date(2022, 2, 19))),
  Date.parse(String(new Date(2022, 2, 20))),
  Date.parse(String(new Date(2022, 2, 26))),
  Date.parse(String(new Date(2022, 2, 27))),
  Date.parse(String(new Date(2022, 3, 2))),
  Date.parse(String(new Date(2022, 3, 3))),
  Date.parse(String(new Date(2022, 3, 9))),
  Date.parse(String(new Date(2022, 3, 10))),
  Date.parse(String(new Date(2022, 3, 16))),
  Date.parse(String(new Date(2022, 3, 17))),
  Date.parse(String(new Date(2022, 3, 23))),
  Date.parse(String(new Date(2022, 3, 24))),
  Date.parse(String(new Date(2022, 3, 30))),
  Date.parse(String(new Date(2022, 4, 1))),
  Date.parse(String(new Date(2022, 4, 2))),
  Date.parse(String(new Date(2022, 4, 3))),
  Date.parse(String(new Date(2022, 4, 7))),
  Date.parse(String(new Date(2022, 4, 8))),
  Date.parse(String(new Date(2022, 4, 9))),
  Date.parse(String(new Date(2022, 4, 10))),
  Date.parse(String(new Date(2022, 4, 14))),
  Date.parse(String(new Date(2022, 4, 15))),
  Date.parse(String(new Date(2022, 4, 21))),
  Date.parse(String(new Date(2022, 4, 22))),
  Date.parse(String(new Date(2022, 4, 28))),
  Date.parse(String(new Date(2022, 4, 29))),
  Date.parse(String(new Date(2022, 5, 4))),
  Date.parse(String(new Date(2022, 5, 5))),
  Date.parse(String(new Date(2022, 5, 11))),
  Date.parse(String(new Date(2022, 5, 12))),
  Date.parse(String(new Date(2022, 5, 13))),
  Date.parse(String(new Date(2022, 5, 18))),
  Date.parse(String(new Date(2022, 5, 19))),
  Date.parse(String(new Date(2022, 5, 25))),
  Date.parse(String(new Date(2022, 5, 26))),
  Date.parse(String(new Date(2022, 6, 2))),
  Date.parse(String(new Date(2022, 6, 3))),
  Date.parse(String(new Date(2022, 6, 9))),
  Date.parse(String(new Date(2022, 6, 10))),
  Date.parse(String(new Date(2022, 6, 16))),
  Date.parse(String(new Date(2022, 6, 17))),
  Date.parse(String(new Date(2022, 6, 23))),
  Date.parse(String(new Date(2022, 6, 24))),
  Date.parse(String(new Date(2022, 6, 30))),
  Date.parse(String(new Date(2022, 6, 31))),
  Date.parse(String(new Date(2022, 7, 6))),
  Date.parse(String(new Date(2022, 7, 7))),
  Date.parse(String(new Date(2022, 7, 13))),
  Date.parse(String(new Date(2022, 7, 14))),
  Date.parse(String(new Date(2022, 7, 20))),
  Date.parse(String(new Date(2022, 7, 21))),
  Date.parse(String(new Date(2022, 7, 27))),
  Date.parse(String(new Date(2022, 7, 28))),
  Date.parse(String(new Date(2022, 8, 3))),
  Date.parse(String(new Date(2022, 8, 4))),
  Date.parse(String(new Date(2022, 8, 10))),
  Date.parse(String(new Date(2022, 8, 11))),
  Date.parse(String(new Date(2022, 8, 17))),
  Date.parse(String(new Date(2022, 8, 18))),
  Date.parse(String(new Date(2022, 8, 24))),
  Date.parse(String(new Date(2022, 8, 25))),
  Date.parse(String(new Date(2022, 9, 1))),
  Date.parse(String(new Date(2022, 9, 2))),
  Date.parse(String(new Date(2022, 9, 8))),
  Date.parse(String(new Date(2022, 9, 9))),
  Date.parse(String(new Date(2022, 9, 15))),
  Date.parse(String(new Date(2022, 9, 16))),
  Date.parse(String(new Date(2022, 9, 22))),
  Date.parse(String(new Date(2022, 9, 23))),
  Date.parse(String(new Date(2022, 9, 29))),
  Date.parse(String(new Date(2022, 9, 30))),
  Date.parse(String(new Date(2022, 10, 4))),
  Date.parse(String(new Date(2022, 10, 5))),
  Date.parse(String(new Date(2022, 10, 6))),
  Date.parse(String(new Date(2022, 10, 12))),
  Date.parse(String(new Date(2022, 10, 13))),
  Date.parse(String(new Date(2022, 10, 19))),
  Date.parse(String(new Date(2022, 10, 20))),
  Date.parse(String(new Date(2022, 10, 26))),
  Date.parse(String(new Date(2022, 10, 27))),
  Date.parse(String(new Date(2022, 11, 3))),
  Date.parse(String(new Date(2022, 11, 4))),
  Date.parse(String(new Date(2022, 11, 10))),
  Date.parse(String(new Date(2022, 11, 11))),
  Date.parse(String(new Date(2022, 11, 17))),
  Date.parse(String(new Date(2022, 11, 18))),
  Date.parse(String(new Date(2022, 11, 24))),
  Date.parse(String(new Date(2022, 11, 25))),
];
