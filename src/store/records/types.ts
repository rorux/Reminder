import { TPeriod, TWeekDay, THolidays, TMonthDays, TQuarter } from '@utils/records/types';

type TWeeklyRecord = {
  title: string;
  period: 'weekly';
  weekday: Omit<TWeekDay, ''>;
  holidays: Omit<THolidays, ''>;
  days: Array<number>;
};

type TMonthlyRecord = {
  title: string;
  period: 'monthly';
  monthday: Omit<TMonthDays, ''>;
  holidays: Omit<THolidays, ''>;
  days: Array<number>;
};

type TQuarterlyRecord = {
  title: string;
  period: 'quarterly';
  quarter: Omit<TQuarter, ''>;
  monthday: Omit<TMonthDays, ''>;
  holidays: Omit<THolidays, ''>;
  days: Array<number>;
};

export type TRecord = {
  id: string;
  title: string;
  period: Omit<TPeriod, ''>;
  weekday?: Omit<TWeekDay, ''>;
  monthday?: Omit<TMonthDays, ''>;
  quarter?: Omit<TQuarter, ''>;
  holidays: Omit<THolidays, ''>;
  days: Array<number>;
};

export interface IRecordsState {
  recordList: Array<TRecord>;
}

export enum RecordsActionTypes {
  RECORDS_INIT = 'RECORDS::RECORDS_INIT',
}

export interface IRecordsInitAction {
  type: RecordsActionTypes.RECORDS_INIT;
  payload: Array<TRecord>;
}
