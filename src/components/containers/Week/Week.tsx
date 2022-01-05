import React from 'react';
import Stack from '@mui/material/Stack';
import { v1 as uuid } from 'uuid';
import { TWeekProps } from './types';
import Day from '@components/Day';
import { TRecord } from '@store/records/types';

const Week: React.FC<TWeekProps> = ({ weekArray, recordList }) => {
  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between', marginBottom: '2px' }}>
      {weekArray.map((number) => {
        const recordsThisDay: Array<TRecord> = [];

        if (number !== null) {
          recordList.forEach((recordObj) => {
            if (recordObj.days.includes(number)) recordsThisDay.push(recordObj);
          });
        }

        return <Day number={number} key={uuid()} records={recordsThisDay} />;
      })}
    </Stack>
  );
};

export default Week;
