import {
  getDaysBeforeHolidays,
  getDaysAfterHolidays,
  weeklyComputedDays,
  monthlyComputedDays,
  quarterlyComputedDays,
} from '../ComputedDays';

describe('ComputedDays utilit testing', () => {
  describe('getDaysBeforeHolidays function testing', () => {
    it('Should return the same days if weekdays', () => {
      const days = [
        Date.parse(String(new Date(2022, 0, 10))),
        Date.parse(String(new Date(2022, 1, 8))),
        Date.parse(String(new Date(2022, 2, 17))),
      ];
      expect(getDaysBeforeHolidays(days)).toEqual(days);
    });

    it('Should return weekdays before if holidays', () => {
      const days = [
        Date.parse(String(new Date(2022, 0, 23))),
        Date.parse(String(new Date(2022, 1, 5))),
        Date.parse(String(new Date(2022, 2, 8))),
      ];
      const daysReceived = [
        Date.parse(String(new Date(2022, 0, 21))),
        Date.parse(String(new Date(2022, 1, 4))),
        Date.parse(String(new Date(2022, 2, 5))),
      ];
      expect(getDaysBeforeHolidays(days)).toEqual(daysReceived);
    });

    it('Should exclude January holidays', () => {
      const days = [
        Date.parse(String(new Date(2022, 0, 1))),
        Date.parse(String(new Date(2022, 0, 5))),
        Date.parse(String(new Date(2022, 0, 9))),
        Date.parse(String(new Date(2022, 0, 10))),
      ];
      const daysExpected = [Date.parse(String(new Date(2022, 0, 10)))];
      expect(getDaysBeforeHolidays(days)).toEqual(daysExpected);
    });
  });

  describe('getDaysAfterHolidays function testing', () => {
    it('Should return the same days if weekdays', () => {
      const days = [
        Date.parse(String(new Date(2022, 0, 10))),
        Date.parse(String(new Date(2022, 1, 8))),
        Date.parse(String(new Date(2022, 2, 17))),
      ];
      expect(getDaysAfterHolidays(days)).toEqual(days);
    });

    it('Should return weekdays after if holidays', () => {
      const days = [
        Date.parse(String(new Date(2022, 0, 1))),
        Date.parse(String(new Date(2022, 0, 5))),
        Date.parse(String(new Date(2022, 0, 23))),
        Date.parse(String(new Date(2022, 1, 5))),
        Date.parse(String(new Date(2022, 2, 8))),
      ];
      const daysReceived = [
        Date.parse(String(new Date(2022, 0, 10))),
        Date.parse(String(new Date(2022, 0, 10))),
        Date.parse(String(new Date(2022, 0, 24))),
        Date.parse(String(new Date(2022, 1, 7))),
        Date.parse(String(new Date(2022, 2, 9))),
      ];
      expect(getDaysAfterHolidays(days)).toEqual(daysReceived);
    });
  });

  describe('weeklyComputedDays function testing', () => {
    it('Should return the same days with option "holidaysNoMatter"', () => {
      const daysReceived = weeklyComputedDays(
        '5',
        'holidaysNoMatter',
        Date.parse(String(new Date(2022, 0, 1))),
        Date.parse(String(new Date(2022, 1, 1)))
      );
      const daysExpected = [
        Date.parse(String(new Date(2022, 0, 7))),
        Date.parse(String(new Date(2022, 0, 14))),
        Date.parse(String(new Date(2022, 0, 21))),
        Date.parse(String(new Date(2022, 0, 28))),
      ];
      expect(daysReceived).toEqual(daysExpected);

      const daysReceived2 = weeklyComputedDays(
        '0',
        'holidaysNoMatter',
        Date.parse(String(new Date(2022, 0, 1))),
        Date.parse(String(new Date(2022, 1, 1)))
      );
      const daysExpected2 = [
        Date.parse(String(new Date(2022, 0, 2))),
        Date.parse(String(new Date(2022, 0, 9))),
        Date.parse(String(new Date(2022, 0, 16))),
        Date.parse(String(new Date(2022, 0, 23))),
        Date.parse(String(new Date(2022, 0, 30))),
      ];
      expect(daysReceived2).toEqual(daysExpected2);
    });

    it('Should return weekdays before with option "beforeHoliday"', () => {
      const daysReceived = weeklyComputedDays(
        '5',
        'beforeHoliday',
        Date.parse(String(new Date(2022, 0, 1))),
        Date.parse(String(new Date(2022, 1, 1)))
      );
      const daysExpected = [
        Date.parse(String(new Date(2022, 0, 14))),
        Date.parse(String(new Date(2022, 0, 21))),
        Date.parse(String(new Date(2022, 0, 28))),
      ];
      expect(daysReceived).toEqual(daysExpected);

      const daysReceived2 = weeklyComputedDays(
        '0',
        'beforeHoliday',
        Date.parse(String(new Date(2022, 0, 1))),
        Date.parse(String(new Date(2022, 1, 1)))
      );
      const daysExpected2 = [
        Date.parse(String(new Date(2022, 0, 14))),
        Date.parse(String(new Date(2022, 0, 21))),
        Date.parse(String(new Date(2022, 0, 28))),
      ];
      expect(daysReceived2).toEqual(daysExpected2);

      const daysReceived3 = weeklyComputedDays(
        '3',
        'beforeHoliday',
        Date.parse(String(new Date(2022, 1, 1))),
        Date.parse(String(new Date(2022, 2, 1)))
      );
      const daysExpected3 = [
        Date.parse(String(new Date(2022, 1, 2))),
        Date.parse(String(new Date(2022, 1, 9))),
        Date.parse(String(new Date(2022, 1, 16))),
        Date.parse(String(new Date(2022, 1, 22))),
      ];
      expect(daysReceived3).toEqual(daysExpected3);
    });

    it('Should return weekdays after with option "afterHoliday"', () => {
      const daysReceived = weeklyComputedDays(
        '5',
        'afterHoliday',
        Date.parse(String(new Date(2022, 0, 1))),
        Date.parse(String(new Date(2022, 1, 1)))
      );
      const daysExpected = [
        Date.parse(String(new Date(2022, 0, 10))),
        Date.parse(String(new Date(2022, 0, 14))),
        Date.parse(String(new Date(2022, 0, 21))),
        Date.parse(String(new Date(2022, 0, 28))),
      ];
      expect(daysReceived).toEqual(daysExpected);

      const daysReceived2 = weeklyComputedDays(
        '0',
        'afterHoliday',
        Date.parse(String(new Date(2022, 0, 1))),
        Date.parse(String(new Date(2022, 1, 1)))
      );
      const daysExpected2 = [
        Date.parse(String(new Date(2022, 0, 10))),
        Date.parse(String(new Date(2022, 0, 10))),
        Date.parse(String(new Date(2022, 0, 17))),
        Date.parse(String(new Date(2022, 0, 24))),
        Date.parse(String(new Date(2022, 0, 31))),
      ];
      expect(daysReceived2).toEqual(daysExpected2);

      const daysReceived3 = weeklyComputedDays(
        '3',
        'afterHoliday',
        Date.parse(String(new Date(2022, 1, 1))),
        Date.parse(String(new Date(2022, 2, 1)))
      );
      const daysExpected3 = [
        Date.parse(String(new Date(2022, 1, 2))),
        Date.parse(String(new Date(2022, 1, 9))),
        Date.parse(String(new Date(2022, 1, 16))),
        Date.parse(String(new Date(2022, 1, 24))),
      ];
      expect(daysReceived3).toEqual(daysExpected3);
    });

    it('Should return the same days with empty option weeklyHolidays', () => {
      const daysReceived = weeklyComputedDays(
        '3',
        '',
        Date.parse(String(new Date(2022, 0, 1))),
        Date.parse(String(new Date(2022, 2, 1)))
      );
      const daysExpected = [
        Date.parse(String(new Date(2022, 0, 5))),
        Date.parse(String(new Date(2022, 0, 12))),
        Date.parse(String(new Date(2022, 0, 19))),
        Date.parse(String(new Date(2022, 0, 26))),
        Date.parse(String(new Date(2022, 1, 2))),
        Date.parse(String(new Date(2022, 1, 9))),
        Date.parse(String(new Date(2022, 1, 16))),
        Date.parse(String(new Date(2022, 1, 23))),
      ];
      expect(daysReceived).toEqual(daysExpected);

      const daysReceived2 = weeklyComputedDays('3', '');
      expect(daysReceived2.length).toEqual(52);
    });
  });

  describe('monthlyComputedDays function testing', () => {
    it('Should return the same days with option "holidaysNoMatter"', () => {
      const daysReceived = monthlyComputedDays('5', 'holidaysNoMatter');
      const daysExpected = [
        Date.parse(String(new Date(2022, 0, 5))),
        Date.parse(String(new Date(2022, 1, 5))),
        Date.parse(String(new Date(2022, 2, 5))),
        Date.parse(String(new Date(2022, 3, 5))),
        Date.parse(String(new Date(2022, 4, 5))),
        Date.parse(String(new Date(2022, 5, 5))),
        Date.parse(String(new Date(2022, 6, 5))),
        Date.parse(String(new Date(2022, 7, 5))),
        Date.parse(String(new Date(2022, 8, 5))),
        Date.parse(String(new Date(2022, 9, 5))),
        Date.parse(String(new Date(2022, 10, 5))),
        Date.parse(String(new Date(2022, 11, 5))),
      ];
      expect(daysReceived).toEqual(daysExpected);
    });

    it('Should return weekdays before with option "beforeHoliday"', () => {
      const daysReceived = monthlyComputedDays(
        '5',
        'beforeHoliday',
        Date.parse(String(new Date(2022, 0, 1))),
        Date.parse(String(new Date(2022, 6, 1)))
      );
      const daysExpected = [
        Date.parse(String(new Date(2022, 1, 4))),
        Date.parse(String(new Date(2022, 2, 5))),
        Date.parse(String(new Date(2022, 3, 5))),
        Date.parse(String(new Date(2022, 4, 5))),
        Date.parse(String(new Date(2022, 5, 3))),
      ];
      expect(daysReceived).toEqual(daysExpected);
    });

    it('Should return weekdays after with option "afterHoliday"', () => {
      const daysReceived = monthlyComputedDays(
        '5',
        'afterHoliday',
        Date.parse(String(new Date(2022, 5, 1))),
        Date.parse(String(new Date(2023, 0, 1)))
      );
      const daysExpected = [
        Date.parse(String(new Date(2022, 5, 6))),
        Date.parse(String(new Date(2022, 6, 5))),
        Date.parse(String(new Date(2022, 7, 5))),
        Date.parse(String(new Date(2022, 8, 5))),
        Date.parse(String(new Date(2022, 9, 5))),
        Date.parse(String(new Date(2022, 10, 7))),
        Date.parse(String(new Date(2022, 11, 5))),
      ];
      expect(daysReceived).toEqual(daysExpected);
    });

    it('Should return the same days with empty option weeklyHolidays', () => {
      const daysReceived = monthlyComputedDays(
        '10',
        '',
        Date.parse(String(new Date(2022, 3, 1))),
        Date.parse(String(new Date(2022, 8, 1)))
      );
      const daysExpected = [
        Date.parse(String(new Date(2022, 3, 10))),
        Date.parse(String(new Date(2022, 4, 10))),
        Date.parse(String(new Date(2022, 5, 10))),
        Date.parse(String(new Date(2022, 6, 10))),
        Date.parse(String(new Date(2022, 7, 10))),
      ];
      expect(daysReceived).toEqual(daysExpected);
    });
  });

  describe('quarterlyComputedDays function testing', () => {
    it('Should return the same days with option "holidaysNoMatter"', () => {
      const daysReceived = quarterlyComputedDays('Янв, Апр, Июл, Окт', '5', 'holidaysNoMatter');
      const daysExpected = [
        Date.parse(String(new Date(2022, 0, 5))),
        Date.parse(String(new Date(2022, 3, 5))),
        Date.parse(String(new Date(2022, 6, 5))),
        Date.parse(String(new Date(2022, 9, 5))),
      ];
      expect(daysReceived).toEqual(daysExpected);
    });

    it('Should return the same days with empty option quarterlyHolidays', () => {
      const daysReceived = quarterlyComputedDays('Янв, Апр, Июл, Окт', '5', '');
      const daysExpected = [
        Date.parse(String(new Date(2022, 0, 5))),
        Date.parse(String(new Date(2022, 3, 5))),
        Date.parse(String(new Date(2022, 6, 5))),
        Date.parse(String(new Date(2022, 9, 5))),
      ];
      expect(daysReceived).toEqual(daysExpected);
    });

    it('Should return weekdays before with option "beforeHoliday"', () => {
      const daysReceived = quarterlyComputedDays('Янв, Апр, Июл, Окт', '3', 'beforeHoliday');
      const daysExpected = [
        Date.parse(String(new Date(2022, 3, 1))),
        Date.parse(String(new Date(2022, 6, 1))),
        Date.parse(String(new Date(2022, 9, 3))),
      ];
      expect(daysReceived).toEqual(daysExpected);

      const daysReceived2 = quarterlyComputedDays('Фев, Май, Авг, Ноя', '7', 'beforeHoliday');
      const daysExpected2 = [
        Date.parse(String(new Date(2022, 1, 7))),
        Date.parse(String(new Date(2022, 4, 6))),
        Date.parse(String(new Date(2022, 7, 5))),
        Date.parse(String(new Date(2022, 10, 7))),
      ];
      expect(daysReceived2).toEqual(daysExpected2);
    });

    it('Should return weekdays after with option "afterHoliday"', () => {
      const daysReceived = quarterlyComputedDays('Янв, Апр, Июл, Окт', '3', 'afterHoliday');
      const daysExpected = [
        Date.parse(String(new Date(2022, 0, 10))),
        Date.parse(String(new Date(2022, 3, 4))),
        Date.parse(String(new Date(2022, 6, 4))),
        Date.parse(String(new Date(2022, 9, 3))),
      ];
      expect(daysReceived).toEqual(daysExpected);

      const daysReceived2 = quarterlyComputedDays('Мар, Июн, Сен, Дек', '7', 'afterHoliday');
      const daysExpected2 = [
        Date.parse(String(new Date(2022, 2, 9))),
        Date.parse(String(new Date(2022, 5, 7))),
        Date.parse(String(new Date(2022, 8, 7))),
        Date.parse(String(new Date(2022, 11, 7))),
      ];
      expect(daysReceived2).toEqual(daysExpected2);
    });

    it('Should throw Error with empty option quarterlyMonths', () => {
      expect(() => quarterlyComputedDays('', '3', 'afterHoliday')).toThrowError('error data');
    });
  });
});
