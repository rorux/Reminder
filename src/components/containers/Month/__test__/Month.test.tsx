import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import Month from '../Month';
import { getCountDaysOnMonth, getTheFirstWeek, getDateParse, getWeek } from '../funcs';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing Functions', () => {
  it('countDaysOnMonth', () => {
    expect(getCountDaysOnMonth(2022, 0, new Date(2022, 0, 1))).toBe(31);
    expect(getCountDaysOnMonth(2022, 1, new Date(2022, 1, 1))).toBe(28);
    expect(getCountDaysOnMonth(2022, 2, new Date(2022, 2, 1))).toBe(31);
    expect(getCountDaysOnMonth(2022, 3, new Date(2022, 3, 1))).toBe(30);
    expect(getCountDaysOnMonth(2022, 4, new Date(2022, 4, 1))).toBe(31);
    expect(getCountDaysOnMonth(2022, 5, new Date(2022, 5, 1))).toBe(30);
    expect(getCountDaysOnMonth(2022, 6, new Date(2022, 6, 1))).toBe(31);
    expect(getCountDaysOnMonth(2022, 7, new Date(2022, 7, 1))).toBe(31);
    expect(getCountDaysOnMonth(2022, 8, new Date(2022, 8, 1))).toBe(30);
    expect(getCountDaysOnMonth(2022, 9, new Date(2022, 9, 1))).toBe(31);
    expect(getCountDaysOnMonth(2022, 10, new Date(2022, 10, 1))).toBe(30);
    expect(getCountDaysOnMonth(2022, 11, new Date(2022, 11, 1))).toBe(31);
    expect(getCountDaysOnMonth(2023, 2, new Date(2023, 2, 1))).toBe(31);
  });

  it('getTheFirstWeek', () => {
    expect(getTheFirstWeek(new Date(2022, 0, 1))).toEqual({
      weekArray: [
        null,
        null,
        null,
        null,
        null,
        Date.parse(String(new Date(2022, 0, 1))),
        Date.parse(String(new Date(2022, 0, 2))),
      ],
      nextDay: new Date(2022, 0, 3),
    });
    expect(getTheFirstWeek(new Date(2022, 1, 1))).toEqual({
      weekArray: [
        null,
        Date.parse(String(new Date(2022, 1, 1))),
        Date.parse(String(new Date(2022, 1, 2))),
        Date.parse(String(new Date(2022, 1, 3))),
        Date.parse(String(new Date(2022, 1, 4))),
        Date.parse(String(new Date(2022, 1, 5))),
        Date.parse(String(new Date(2022, 1, 6))),
      ],
      nextDay: new Date(2022, 1, 7),
    });
    expect(getTheFirstWeek(new Date(2022, 3, 1))).toEqual({
      weekArray: [
        null,
        null,
        null,
        null,
        Date.parse(String(new Date(2022, 3, 1))),
        Date.parse(String(new Date(2022, 3, 2))),
        Date.parse(String(new Date(2022, 3, 3))),
      ],
      nextDay: new Date(2022, 3, 4),
    });
    expect(getTheFirstWeek(new Date(2022, 4, 1))).toEqual({
      weekArray: [null, null, null, null, null, null, Date.parse(String(new Date(2022, 4, 1)))],
      nextDay: new Date(2022, 4, 2),
    });
    expect(getTheFirstWeek(new Date(2022, 8, 1))).toEqual({
      weekArray: [
        null,
        null,
        null,
        Date.parse(String(new Date(2022, 8, 1))),
        Date.parse(String(new Date(2022, 8, 2))),
        Date.parse(String(new Date(2022, 8, 3))),
        Date.parse(String(new Date(2022, 8, 4))),
      ],
      nextDay: new Date(2022, 8, 5),
    });
  });

  it('getDateParse', () => {
    const day1 = 1643662800000;
    const day2 = day1 + 86400000;
    const day3 = day2 + 86400000;
    expect(getDateParse(new Date(2022, 1, 1), 0)).toBe(day1);
    expect(getDateParse(new Date(2022, 1, 1), 1)).toBe(day2);
    expect(getDateParse(new Date(2022, 1, 1), 2)).toBe(day3);

    const day20220227 = 1645909200000;
    const day20220228 = day20220227 + 86400000;

    expect(getDateParse(new Date(2022, 1, 27), 0, 1)).toBe(day20220227);
    expect(getDateParse(new Date(2022, 1, 27), 1, 1)).toBe(day20220228);
    expect(getDateParse(new Date(2022, 1, 27), 2, 1)).toBe(null);
  });

  it('getWeek', () => {
    expect(getWeek(null)).toEqual({
      weekArray: [null, null, null, null, null, null, null],
      nextDay: null,
    });

    expect(getWeek(new Date(2022, 1, 7))).toEqual({
      weekArray: [
        Date.parse(String(new Date(2022, 1, 7))),
        Date.parse(String(new Date(2022, 1, 8))),
        Date.parse(String(new Date(2022, 1, 9))),
        Date.parse(String(new Date(2022, 1, 10))),
        Date.parse(String(new Date(2022, 1, 11))),
        Date.parse(String(new Date(2022, 1, 12))),
        Date.parse(String(new Date(2022, 1, 13))),
      ],
      nextDay: new Date(2022, 1, 14),
    });

    expect(getWeek(new Date(2022, 1, 14))).toEqual({
      weekArray: [
        Date.parse(String(new Date(2022, 1, 14))),
        Date.parse(String(new Date(2022, 1, 15))),
        Date.parse(String(new Date(2022, 1, 16))),
        Date.parse(String(new Date(2022, 1, 17))),
        Date.parse(String(new Date(2022, 1, 18))),
        Date.parse(String(new Date(2022, 1, 19))),
        Date.parse(String(new Date(2022, 1, 20))),
      ],
      nextDay: new Date(2022, 1, 21),
    });

    expect(getWeek(new Date(2022, 1, 28))).toEqual({
      weekArray: [Date.parse(String(new Date(2022, 1, 28))), null, null, null, null, null, null],
      nextDay: null,
    });

    expect(getWeek(new Date(2022, 6, 25))).toEqual({
      weekArray: [
        Date.parse(String(new Date(2022, 6, 25))),
        Date.parse(String(new Date(2022, 6, 26))),
        Date.parse(String(new Date(2022, 6, 27))),
        Date.parse(String(new Date(2022, 6, 28))),
        Date.parse(String(new Date(2022, 6, 29))),
        Date.parse(String(new Date(2022, 6, 30))),
        Date.parse(String(new Date(2022, 6, 31))),
      ],
      nextDay: null,
    });

    expect(getWeek(new Date(2022, 7, 29))).toEqual({
      weekArray: [
        Date.parse(String(new Date(2022, 7, 29))),
        Date.parse(String(new Date(2022, 7, 30))),
        Date.parse(String(new Date(2022, 7, 31))),
        null,
        null,
        null,
        null,
      ],
      nextDay: null,
    });

    expect(getWeek(new Date(2022, 0, 31))).toEqual({
      weekArray: [Date.parse(String(new Date(2022, 0, 31))), null, null, null, null, null, null],
      nextDay: null,
    });
  });
});
