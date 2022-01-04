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

export type TRecordEdit = {
  id: string;
  title: string;
  period: TPeriod;
  weekday?: TWeekDay;
  monthday?: TMonthDays;
  quarter?: TQuarter;
  holidays: THolidays;
  days: Array<number>;
};

export interface IRecordsState {
  recordList: Array<TRecord>;
  loading: boolean;
  error: null | string;
}

export enum RecordsActionTypes {
  RECORDS_INIT = 'RECORDS::RECORDS_INIT',
  RECORDS_SUCCESS = 'RECORDS::RECORDS_SUCCESS',
  RECORDS_ERROR = 'RECORDS::RECORDS_ERROR',
  RECORDS_DELETE = 'RECORDS::RECORDS_DELETE',
}

interface IRecordsInitAction {
  type: RecordsActionTypes.RECORDS_INIT;
}

interface IRecordsSuccessAction {
  type: RecordsActionTypes.RECORDS_SUCCESS;
  payload: Array<TRecord>;
}

interface IRecordsErrorAction {
  type: RecordsActionTypes.RECORDS_ERROR;
  payload: string;
}

export type TRecordsAction = IRecordsInitAction | IRecordsSuccessAction | IRecordsErrorAction;
