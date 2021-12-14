import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { authClearErrorAction } from '@store/auth/actions';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface IAuthSnackbarProps {
  message: string;
}

const AuthSnackbar: React.FC<IAuthSnackbarProps> = ({ message }) => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(true);
  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
    dispatch(authClearErrorAction());
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={openSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
      action={action}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AuthSnackbar;
