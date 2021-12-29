import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import { ROUTES } from '@router/types';
import RecordsAccordion from '@components/RecordsAccordion';
import { initRecords } from '@store/records/actions';
import { recordsSelector } from '@store/records/selectors';
import RecordListRenderer from '@utils/records/RecordListRenderer';

const Dashboard = () => {
  const { recordList } = useSelector(recordsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initRecords());
  }, [dispatch]);

  const recordListRender = RecordListRenderer(recordList);

  return (
    <div data-test="dashboard">
      <Grid container>
        <Grid item sm>
          <Typography variant="overline" display="block" gutterBottom>
            Список дел
          </Typography>
        </Grid>
        <Grid item>
          <Link to={ROUTES.CREATE_RECORD}>
            <Tooltip title="Создать новое напоминание" placement="left">
              <Fab
                size="small"
                color="inherit"
                aria-label="add"
                sx={{ mb: 1, boxShadow: 0 }}
                variant="extended"
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </Link>
        </Grid>
      </Grid>

      {recordListRender.length ? (
        <RecordsAccordion recordListRender={recordListRender} />
      ) : (
        <Typography variant="body2" gutterBottom>
          У Вас нет сохраненных записей. Создайте напоминание, кликнув на &quot;плюс&ldquo; в правом
          верхнем углу.
        </Typography>
      )}
    </div>
  );
};

export default Dashboard;
