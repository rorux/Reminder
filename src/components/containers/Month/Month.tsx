import React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';
import { v1 as uuid } from 'uuid';
import { TMonthProps } from './types';
import { getTheFirstWeek, getWeek } from './funcs';
import { weekdays } from './constants';
import Week from '../Week';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.caption,
  padding: theme.spacing(1),
  textAlign: 'center',
  width: 32,
  height: 32,
}));

const Month: React.FC<TMonthProps> = ({ year, month, recordList }) => {
  const first = new Date(year, month, 1);

  const week1 = getTheFirstWeek(first);
  const week2 = getWeek(week1.nextDay);
  const week3 = getWeek(week2.nextDay);
  const week4 = getWeek(week3.nextDay);
  const week5 = getWeek(week4.nextDay);
  const week6 = getWeek(week5.nextDay);

  return (
    <div data-test="month">
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
        {weekdays.map((weekday) => (
          <Item elevation={0} sx={{ color: grey[400] }} key={uuid()}>
            {weekday}
          </Item>
        ))}
      </Stack>
      <Week weekArray={week1.weekArray} recordList={recordList} />
      <Week weekArray={week2.weekArray} recordList={recordList} />
      <Week weekArray={week3.weekArray} recordList={recordList} />
      <Week weekArray={week4.weekArray} recordList={recordList} />
      <Week weekArray={week5.weekArray} recordList={recordList} />
      <Week weekArray={week6.weekArray} recordList={recordList} />
    </div>
  );
};

export default Month;
