import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { TConfirmProps } from './types';

const Confirm: React.FC<TConfirmProps> = ({ open, setOpen, handler, id }) => {
  const [openConfirm, setOpenConfirm] = React.useState(true);

  useEffect(() => {
    setOpenConfirm(open);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handlerFunc = (e: React.MouseEvent<HTMLElement>, id: string) => {
    handler(e, id);
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={openConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText>Удалить напоминание?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button data-test="disagree" onClick={handleClose}>
            Отмена
          </Button>
          <Button data-test="agree" onClick={(e) => handlerFunc(e, id)} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Confirm;
