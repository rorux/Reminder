import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';
import { ROUTES } from '@router/types';
import RecordsAccordion from '@components/RecordsAccordion';
import { initRecords, deleteRecordWithFirebase } from '@store/records/actions';
import { recordsSelector } from '@store/records/selectors';
import RecordListRenderer from '@utils/records/RecordListRenderer';
import './style.scss';

const Dashboard = () => {
  const { recordList, loading } = useSelector(recordsSelector);
  const dispatch = useDispatch();

  const recordListRender = RecordListRenderer(recordList);

  useEffect(() => {
    dispatch(initRecords());
  }, [dispatch]);

  const handleDeleteRecord = (event: React.MouseEvent<HTMLElement> | null, id: string) => {
    dispatch(deleteRecordWithFirebase(id));
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div data-test="dashboard" className="dashboard">
          <Grid container>
            <Grid item sm flexGrow={1}>
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

          <Grid container>
            {recordListRender.length ? (
              <RecordsAccordion
                recordListRender={recordListRender}
                handleDelete={handleDeleteRecord}
              />
            ) : (
              <Typography data-test="empty-list" variant="body2" gutterBottom>
                У Вас нет сохраненных записей. Создайте напоминание, кликнув на &quot;плюс&ldquo; в
                правом верхнем углу.
              </Typography>
            )}
          </Grid>
        </div>
      )}
    </>
  );
};

export default Dashboard;
