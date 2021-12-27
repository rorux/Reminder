import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import MonthPicker from '@mui/lab/MonthPicker';
import Grid from '@mui/material/Grid';

const minDate = new Date('2020-01-01T00:00:00.000');
const maxDate = new Date('2025-01-01T00:00:00.000');

const Calendar = () => {
  const [date, setDate] = React.useState<Date | null>(new Date());

  return (
    <div data-test="calendar">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <MonthPicker
              date={date}
              minDate={minDate}
              maxDate={maxDate}
              onChange={(newDate) => setDate(newDate)}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </div>
  );
};

export default Calendar;
