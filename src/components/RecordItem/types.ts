import React from 'react';
import { TRecordAccordion } from '@components/RecordsAccordion/types';

export type TRecordItemProps = {
  record: TRecordAccordion;
  handleChange: (
    panel: string
  ) => (event: React.SyntheticEvent | null, isExpanded: boolean) => void;
  expanded: string | false;
  handleDelete: (event: React.MouseEvent<HTMLElement> | null, id: string) => void;
};
