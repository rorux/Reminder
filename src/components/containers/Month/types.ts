import { TRecord } from '@store/records/types';

export type TMonthProps = {
  year: number;
  month: number;
  recordList: Array<TRecord>;
};
