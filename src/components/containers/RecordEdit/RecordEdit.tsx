import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
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
import { getRecordFromFirebase, changeRecordWithFirebase } from '@store/records/actions';
import { TPeriod, TWeekDay, THolidays, TMonthDays, TQuarter } from '@utils/records/types';
import { WEEKDAY, HOLIDAYS, MONTH_DAYS, QUARTER } from '@utils/records/constants';
import { TParams } from './types';
import { TRecord, TRecordEdit } from '@store/records/types';
import { ROUTES } from '@router/types';

const RecordEdit = () => {
  const [record, setRecord] = React.useState<TRecordEdit | undefined>(undefined);
  const idRecord = useParams<TParams>().id;

  const [isCreated, setIsCreated] = React.useState(false);

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
    const recordFromFirebase = dispatch(getRecordFromFirebase(idRecord));
    if (recordFromFirebase !== null) {
      setRecord(recordFromFirebase);
    }
  }, [dispatch, idRecord]);

  useEffect(() => {
    if (record?.weekday !== undefined && record?.period === 'weekly')
      setWeeklyWeekDay(record?.weekday);
    if (record?.holidays !== undefined && record?.period === 'weekly')
      setWeeklyHolidays(record?.holidays);

    if (record?.monthday !== undefined && record?.period === 'monthly')
      setMonthlyDay(record?.monthday);
    if (record?.holidays !== undefined && record?.period === 'monthly')
      setMonthlyHolidays(record?.holidays);

    if (record?.quarter !== undefined && record?.period === 'quarterly')
      setQuarterlyMonths(record?.quarter);
    if (record?.monthday !== undefined && record?.period === 'quarterly')
      setQuarterlyDay(record?.monthday);
    if (record?.holidays !== undefined && record?.period === 'quarterly')
      setQuarterlyHolidays(record?.holidays);
  }, [record]);

  useEffect(() => {
    if (weeklyWeekDay && weeklyHolidays) {
      setIsFormReady('weekly');
    } else if (monthlyDay && monthlyHolidays) {
      setIsFormReady('monthly');
    } else if (quarterlyMonths && quarterlyDay && quarterlyHolidays) {
      setIsFormReady('quarterly');
    } else {
      setIsFormReady('');
    }
  }, [
    weeklyWeekDay,
    weeklyHolidays,
    monthlyDay,
    monthlyHolidays,
    quarterlyMonths,
    quarterlyDay,
    quarterlyHolidays,
  ]);

  const periodValueRus = (period: Omit<TPeriod, ''>) => {
    if (period === 'weekly') return 'Еженедельно';
    else if (period === 'monthly') return 'Ежемесячно';
    else if (period === 'quarterly') return 'Ежеквартально';
    else return null;
  };

  const handleClickSubmit = useCallback(() => {
    if (record !== undefined) {
      setLoadingSubmit(true);
      let days: Array<number> = [];
      const recordEdit: TRecord = {
        title: record.title,
        period: record.period,
        id: record.id,
        holidays: '',
        days: [],
      };
      if (isFormReady === 'weekly') {
        days = weeklyComputedDays(weeklyWeekDay, weeklyHolidays);
        recordEdit.weekday = weeklyWeekDay;
        recordEdit.holidays = weeklyHolidays;
      } else if (isFormReady === 'monthly') {
        days = monthlyComputedDays(monthlyDay, monthlyHolidays);
        recordEdit.monthday = monthlyDay;
        recordEdit.holidays = monthlyHolidays;
      } else if (isFormReady === 'quarterly') {
        days = quarterlyComputedDays(quarterlyMonths, quarterlyDay, quarterlyHolidays);
        recordEdit.quarter = quarterlyMonths;
        recordEdit.monthday = quarterlyDay;
        recordEdit.holidays = quarterlyHolidays;
      } else throw Error;
      recordEdit.days = days;
      dispatch(changeRecordWithFirebase(recordEdit));
      setLoadingSubmit(false);
      setIsCreated(true);
    }
  }, [
    record,
    isFormReady,
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
    <div data-test="record-edit">
      {record ? (
        <>
          <Typography sx={{ mb: 1 }} variant="overline" display="block" gutterBottom>
            Отредактируйте запись
          </Typography>
          <Grid container spacing={3} maxWidth={600}>
            <Grid item xs={12}>
              <TextField
                value={record.title}
                label="Наименование"
                variant="outlined"
                fullWidth
                required
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={periodValueRus(record.period)}
                label="Периодичность"
                variant="outlined"
                fullWidth
                required
                disabled
              />
            </Grid>

            {record.period === 'weekly' && (
              <>
                <Grid item xs={12}>
                  <RecordSelect
                    name="День недели"
                    params={WEEKDAY}
                    setter={setWeeklyWeekDay}
                    value={record.weekday}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RecordSelect
                    name="Праздники и выходные"
                    params={HOLIDAYS}
                    setter={setWeeklyHolidays}
                    value={record.holidays}
                  />
                </Grid>
              </>
            )}
            {record.period === 'monthly' && (
              <>
                <Grid item xs={12}>
                  <RecordSelect
                    name="Число"
                    params={MONTH_DAYS}
                    setter={setMonthlyDay}
                    value={record.monthday}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RecordSelect
                    name="Праздники и выходные"
                    params={HOLIDAYS}
                    setter={setMonthlyHolidays}
                    value={record.holidays}
                  />
                </Grid>
              </>
            )}
            {record.period === 'quarterly' && (
              <>
                <Grid item xs={12}>
                  <RecordSelect
                    name="Месяцы"
                    params={QUARTER}
                    setter={setQuarterlyMonths}
                    value={record.quarter}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RecordSelect
                    name="Число"
                    params={MONTH_DAYS}
                    setter={setQuarterlyDay}
                    value={record.monthday}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RecordSelect
                    name="Праздники и выходные"
                    params={HOLIDAYS}
                    setter={setQuarterlyHolidays}
                    value={record.holidays}
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
        </>
      ) : (
        <Typography data-test="empty-record" variant="body2" gutterBottom>
          Данная запись не найдена.
        </Typography>
      )}
    </div>
  );
};

export default RecordEdit;
