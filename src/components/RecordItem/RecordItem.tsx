import React from 'react';
import { Redirect } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Confirm from '@components/Confirm';
import { TRecordItemProps } from './types';

const RecordItem: React.FC<TRecordItemProps> = ({
  record,
  expanded,
  handleChange,
  handleDelete,
}) => {
  const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  if (isEdit) return <Redirect to={`/edit/${record.id}`} />;

  return (
    <Accordion
      expanded={expanded === `panel${record.id}`}
      onChange={handleChange(`panel${record.id}`)}
      key={record.id}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${record.id}bh-content`}
        id={`panel${record.id}bh-header`}
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>{record.period}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{record.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{record.comment}</Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            data-test="edit-button"
            variant="contained"
            color="warning"
            sx={{ boxShadow: 0 }}
            onClick={() => setIsEdit(true)}
          >
            Изменить
          </Button>
          <Button
            data-test="delete-button"
            variant="contained"
            color="error"
            sx={{ boxShadow: 0 }}
            onClick={() => setIsOpenConfirm(true)}
          >
            Удалить
          </Button>
          <Confirm
            open={isOpenConfirm}
            setOpen={setIsOpenConfirm}
            handler={handleDelete}
            id={record.id}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default RecordItem;
