import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { v1 as uuid } from 'uuid';
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
import { addRecordWithFirebase } from '@store/records/actions';
import { TRecord } from '@store/records/types';
import { ROUTES } from '@router/types';

const RecordCreate = () => {
  const [isCreated, setIsCreated] = React.useState(false);
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

  const dispatch = useDispatch();

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
    setTitle(event?.target.value as string);
  };

  const handleClickSubmit = useCallback(() => {
    setLoadingSubmit(true);
    let days: Array<number> = [];
    const record: TRecord = { id: uuid(), title, period: '', holidays: '', days: [] };
    if (periodValue === 'weekly') {
      days = weeklyComputedDays(weeklyWeekDay, weeklyHolidays);
      record.period = 'weekly';
      record.weekday = weeklyWeekDay;
      record.holidays = weeklyHolidays;
    } else if (periodValue === 'monthly') {
      days = monthlyComputedDays(monthlyDay, monthlyHolidays);
      record.period = 'monthly';
      record.monthday = monthlyDay;
      record.holidays = monthlyHolidays;
    } else if (periodValue === 'quarterly') {
      days = quarterlyComputedDays(quarterlyMonths, quarterlyDay, quarterlyHolidays);
      record.period = 'quarterly';
      record.quarter = quarterlyMonths;
      record.monthday = quarterlyDay;
      record.holidays = quarterlyHolidays;
    } else throw Error('error data');
    record.days = days;
    dispatch(addRecordWithFirebase(record));
    setLoadingSubmit(false);
    setIsCreated(true);
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
    dispatch,
  ]);

  if (isCreated) return <Redirect to={ROUTES.DASHBOARD} />;

  return (
    <div data-test="record-create">
      <Typography sx={{ mb: 1 }} variant="overline" display="block" gutterBottom>
        Заполните форму
      </Typography>
      <Grid container spacing={3} maxWidth={600}>
        <Grid item xs={12}>
          <TextField
            data-test="input-title"
            value={title}
            onChange={handleTitleChange}
            label="Наименование"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <RecordSelect
            data-test="select-period-value"
            name="Периодичность"
            params={PERIOD}
            setter={setPeriodValue}
          />
        </Grid>
        {periodValue === 'weekly' && (
          <>
            <Grid item xs={12}>
              <RecordSelect
                data-test="select-weekly-weekday"
                name="День недели"
                params={WEEKDAY}
                setter={setWeeklyWeekDay}
              />
            </Grid>
            <Grid item xs={12}>
              <RecordSelect
                data-test="select-weekly-holidays"
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
              <RecordSelect
                data-test="select-monthly-monthday"
                name="Число"
                params={MONTH_DAYS}
                setter={setMonthlyDay}
              />
            </Grid>
            <Grid item xs={12}>
              <RecordSelect
                data-test="select-monthly-holidays"
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
              <RecordSelect
                data-test="select-quarterly-months"
                name="Месяцы"
                params={QUARTER}
                setter={setQuarterlyMonths}
              />
            </Grid>
            <Grid item xs={12}>
              <RecordSelect
                data-test="select-quarterly-monthday"
                name="Число"
                params={MONTH_DAYS}
                setter={setQuarterlyDay}
              />
            </Grid>
            <Grid item xs={12}>
              <RecordSelect
                data-test="select-quarterly-holidays"
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
