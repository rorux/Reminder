import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import { appSelector } from '@store/app/selectors';
import { modalCloseAction } from '@store/app/actions';
import { TPeriod } from '@utils/records/types';
import { getHumanDate } from '@utils/funcs';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function CustomizedDialogs() {
  const { isModalRecordsOpen, modalRecords, modalDate } = useSelector(appSelector);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(modalCloseAction());
  };

  const handlePeriod = (period: Omit<TPeriod, ''>) => {
    if (period === 'weekly') return 'Еженедельно';
    else if (period === 'monthly') return 'Ежемесячно';
    else if (period === 'quarterly') return 'Ежеквартально';
  };

  return (
    <BootstrapDialog
      data-test="dialog"
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isModalRecordsOpen}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {getHumanDate(modalDate)}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {modalRecords.map((record) => (
            <ListItem key={record.id}>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={record.title} secondary={handlePeriod(record.period)} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </BootstrapDialog>
  );
}
