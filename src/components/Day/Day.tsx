import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { grey, green } from '@mui/material/colors';
import { TDayProps, TStylesDay } from './types';
import { MyContext } from '@components/containers/Calendar/Calendar';
import { modalOpenAction } from '@store/app/actions';
import { HOLIDAYS_2022 } from '@utils/records/constants';

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.caption,
  padding: theme.spacing(1),
  textAlign: 'center',
  width: 32,
  height: 32,
}));

const Day: React.FC<TDayProps> = ({ number, records }) => {
  const contextValue = useContext(MyContext);
  const dispatch = useDispatch();

  const handleShowRecords = () => {
    if (number !== null) dispatch(modalOpenAction({ records, date: number }));
  };

  const styles: TStylesDay = {};

  if (records.length) {
    styles.backgroundColor = grey[300];
    styles.cursor = 'pointer';
  }

  if (contextValue.todayParse === number) {
    styles.backgroundColor = green[200];
  }

  if (number !== null && HOLIDAYS_2022.includes(number)) {
    styles.color = 'red';
  }

  if (contextValue.todayParse === number && records.length && number !== null) {
    dispatch(modalOpenAction({ records, date: number }));
  }

  return (
    <Item
      data-test="item"
      elevation={0}
      sx={styles}
      onClick={records.length ? handleShowRecords : undefined}
    >
      {number !== null ? new Date(number).getDate() : ''}
    </Item>
  );
};

export default Day;
