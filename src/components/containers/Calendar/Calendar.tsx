import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { initRecords } from '@store/records/actions';
import Month from '../Month';
import { getMonthName } from './constants';
import { recordsSelector } from '@store/records/selectors';
import './style.scss';
import Modal from '@components/Modal';

const todayDate = new Date();
const todayParse = Date.parse(
  String(new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()))
);
export const MyContext = React.createContext({ todayParse });

const Calendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [isBeforeMonthDisabled, setIsBeforeMonthDisabled] = useState(false);
  const [isNextMonthDisabled, setIsNextMonthDisabled] = useState(false);

  const { recordList, loading } = useSelector(recordsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initRecords());
  }, [dispatch]);

  useEffect(() => {
    if (month === 0) setIsBeforeMonthDisabled(true);
    else setIsBeforeMonthDisabled(false);
    if (month === 11) setIsNextMonthDisabled(true);
    else setIsNextMonthDisabled(false);
  }, [month]);

  const handleBeforeMonth = () => {
    setMonth((month) => month - 1);
  };

  const handleNextMonth = () => {
    setMonth((month) => month + 1);
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div data-test="calendar" className="months-wrap">
          <Box
            sx={{
              minWidth: 260,
              backgroundColor: grey[200],
              borderRadius: 1,
              boxSizing: 'border-box',
            }}
            p={1}
          >
            <Paper elevation={0} sx={{ padding: '5px', paddingTop: '2px' }}>
              <Grid sx={{ height: 40 }} p={1} container>
                <Grid item sm flexGrow={1}>
                  <Typography variant="overline" gutterBottom>
                    {getMonthName[month]} {year}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={isBeforeMonthDisabled}
                    aria-label="delete"
                    size="small"
                    onClick={handleBeforeMonth}
                  >
                    <NavigateBefore fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    disabled={isNextMonthDisabled}
                    aria-label="delete"
                    size="small"
                    onClick={handleNextMonth}
                  >
                    <NavigateNext fontSize="inherit" />
                  </IconButton>
                </Grid>
              </Grid>
              <MyContext.Provider value={{ todayParse }}>
                <Month year={year} month={month} recordList={recordList} />
              </MyContext.Provider>
            </Paper>
          </Box>
          <Modal />
        </div>
      )}
    </>
  );
};

export default Calendar;
