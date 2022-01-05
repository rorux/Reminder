import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { grey, green } from '@mui/material/colors';
import { TDayProps, TStylesDay } from './types';
import { MyContext } from '@components/containers/Calendar/Calendar';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.caption,
  padding: theme.spacing(1),
  textAlign: 'center',
  width: 32,
  height: 32,
}));

const Day: React.FC<TDayProps> = ({ number, records }) => {
  const contextValue = useContext(MyContext);

  const handleShowRecords = () => {
    console.log(records);
  };

  const styles: TStylesDay = {};

  if (records.length) {
    styles.backgroundColor = grey[300];
    styles.cursor = 'pointer';
  }

  if (contextValue.todayParse === number) {
    styles.backgroundColor = green[200];
  }

  return (
    <Item elevation={0} sx={styles} onClick={records.length ? handleShowRecords : undefined}>
      {number !== null ? new Date(number).getDate() : ''}
    </Item>
  );
};

export default Day;
