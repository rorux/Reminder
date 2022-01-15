import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getProfileFromFirebase, changeProfileWithFirebase } from '@store/profile/actions';
import { profileSelector } from '@store/profile/selectors';

const Profile = () => {
  const [name, setName] = useState('');
  const { userName, loading } = useSelector(profileSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileFromFirebase());
  }, [dispatch]);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event?.target.value as string);
  };

  const changeNameWithFirebase = useCallback(() => {
    dispatch(changeProfileWithFirebase({ userName: name }));
  }, [dispatch, name]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div data-test="profile">
          <Typography variant="body1">
            Ваше имя: <strong>{userName}</strong>
          </Typography>
          <TextField
            id="standard-basic"
            label="Введите другое имя.."
            variant="standard"
            sx={{ marginTop: 2, marginRight: 2 }}
            value={name}
            onChange={changeName}
          />
          <Button
            disabled={!name}
            variant="contained"
            color="success"
            sx={{ marginTop: 3 }}
            onClick={changeNameWithFirebase}
          >
            Изменить имя
          </Button>
        </div>
      )}
    </>
  );
};

export default Profile;
