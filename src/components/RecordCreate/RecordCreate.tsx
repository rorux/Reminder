import React, { useCallback, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import RecordSelect from '@components/formsUI/RecordSelect';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import {
  weeklyComputedDays,
  monthlyComputedDays,
  quarterlyComputedDays,
} from '@utils/records/ComputedDays';
import { TPeriod, TWeekDay, THolidays, TMonthDays, TQuarter } from '@utils/records/types';
import { PERIOD, WEEKDAY, HOLIDAYS, MONTH_DAYS, QUARTER } from '@utils/records/constants';

const RecordCreate = () => {
  const [title, setTitle] = React.useState('');
  const [periodValue, setPeriodValue] = React.useState<TPeriod>('');

  const [weeklyWeekDay, setWeeklyWeekDay] = React.useState<TWeekDay>('');
  const [weeklyHolidays, setWeeklyHolidays] = React.useState<THolidays>('');

  const [monthlyDay, setMonthlyDay] = React.useState<TMonthDays>('');
  const [monthlyHolidays, setMonthlyHolidays] = React.useState<THolidays>('');

  const [quarterlyMonths, setQuarterlyMonths] = React.useState<TQuarter>('');
  const [quarterlyDay, setQuarterlyDay] = React.useState<TMonthDays>('');
  const [quarterlyHolidays, setQuarterlyHolidays] = React.useState<THolidays>('');

  const [isFormReady, setIsFormReady] = React.useState<TPeriod>('');
  const [loadingSubmit, setLoadingSubmit] = React.useState<boolean>(false);

  useEffect(() => {
    if (periodValue === 'weekly' && title && weeklyWeekDay && weeklyHolidays) {
      setIsFormReady('weekly');
    } else if (periodValue === 'monthly' && title && monthlyDay && monthlyHolidays) {
      setIsFormReady('monthly');
    } else if (
      periodValue === 'quarterly' &&
      title &&
      quarterlyMonths &&
      quarterlyDay &&
      quarterlyHolidays
    ) {
      setIsFormReady('quarterly');
    } else {
      setIsFormReady('');
    }
  }, [
    title,
    periodValue,
    weeklyWeekDay,
    weeklyHolidays,
    monthlyDay,
    monthlyHolidays,
    quarterlyMonths,
    quarterlyDay,
    quarterlyHolidays,
  ]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value as string);
  };

  const handleClickSubmit = useCallback(() => {
    setLoadingSubmit(true);
    let days: Array<number> = [];
    if (periodValue === 'weekly') {
      days = weeklyComputedDays(weeklyWeekDay, weeklyHolidays);
    } else if (periodValue === 'monthly') {
      days = monthlyComputedDays(monthlyDay, monthlyHolidays);
    } else if (periodValue === 'quarterly') {
      days = quarterlyComputedDays(quarterlyMonths, quarterlyDay, quarterlyHolidays);
    } else throw Error;
    console.log(days);
    setLoadingSubmit(false);
  }, [
    periodValue,
    weeklyWeekDay,
    weeklyHolidays,
    monthlyDay,
    monthlyHolidays,
    quarterlyMonths,
    quarterlyDay,
    quarterlyHolidays,
  ]);

  return (
    <div data-test="record-create">
      <Typography sx={{ mb: 1 }} variant="overline" display="block" gutterBottom>
        Заполните форму
      </Typography>
      <Grid container spacing={3} maxWidth={600}>
        <Grid item xs={12}>
          <TextField
            value={title}
            onChange={handleTitleChange}
            label="Наименование"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <RecordSelect name="Периодичность" params={PERIOD} setter={setPeriodValue} />
        </Grid>
        {periodValue === 'weekly' && (
          <>
            <Grid item xs={12}>
              <RecordSelect name="День недели" params={WEEKDAY} setter={setWeeklyWeekDay} />
            </Grid>
            <Grid item xs={12}>
              <RecordSelect
                name="Праздники и выходные"
                params={HOLIDAYS}
                setter={setWeeklyHolidays}
              />
            </Grid>
          </>
        )}
        {periodValue === 'monthly' && (
          <>
            <Grid item xs={12}>
              <RecordSelect name="Число" params={MONTH_DAYS} setter={setMonthlyDay} />
            </Grid>
            <Grid item xs={12}>
              <RecordSelect
                name="Праздники и выходные"
                params={HOLIDAYS}
                setter={setMonthlyHolidays}
              />
            </Grid>
          </>
        )}
        {periodValue === 'quarterly' && (
          <>
            <Grid item xs={12}>
              <RecordSelect name="Месяцы" params={QUARTER} setter={setQuarterlyMonths} />
            </Grid>
            <Grid item xs={12}>
              <RecordSelect name="Число" params={MONTH_DAYS} setter={setQuarterlyDay} />
            </Grid>
            <Grid item xs={12}>
              <RecordSelect
                name="Праздники и выходные"
                params={HOLIDAYS}
                setter={setQuarterlyHolidays}
              />
            </Grid>
          </>
        )}
        <Grid item>
          <LoadingButton
            variant="contained"
            color="success"
            disabled={!isFormReady}
            endIcon={<SendIcon />}
            loadingPosition="end"
            loading={loadingSubmit}
            onClick={handleClickSubmit}
            size="large"
          >
            Сохранить
          </LoadingButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default RecordCreate;
