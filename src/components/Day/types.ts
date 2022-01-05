import { TRecord } from '@store/records/types';

export type TDayProps = {
  number: null | number;
  records: Array<TRecord>;
};

export type TStylesDay = {
  backgroundColor?: string;
  cursor?: 'pointer';
};
