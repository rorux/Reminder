import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ROUTES } from '@router/types';
import TextFieldWrapper from '@components/formsUI/TextField';
import AuthSnackbar from '@components/AuthSnackbar';
import { authSelector } from '@store/auth/selectors';
import { authRegisterAction } from '@store/auth/actions';

const theme = createTheme();

const INITIAL_FORM_STATE = {
  firstName: '',
  email: '',
  password: '',
};

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string()
    .required('Введите, пожалуйста, имя!')
    .min(2, 'Слишком короткое имя!')
    .max(10, 'Слишком длинное имя!'),
  email: Yup.string().email('Некорректный email!').required('Введите, пожалуйста, email!'),
  password: Yup.string()
    .required('Введите, пожалуйста, пароль!')
    .min(6, 'Пароль от 6 символов!')
    .max(20, 'Пароль не более 20 символов!'),
});

type TValues = {
  firstName: string;
  email: string;
  password: string;
};

export default function Register() {
  const { error } = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (values: TValues): void => {
      dispatch(authRegisterAction(values));
    },
    [dispatch]
  );

  return (
    <ThemeProvider theme={theme}>
      {error && <AuthSnackbar message={error} />}
      <Container component="main" maxWidth="xs" data-test="registerComponent">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={handleSubmit}
              className="form-register"
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextFieldWrapper fullWidth name="firstName" label="Введите имя" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldWrapper fullWidth name="email" label="Введите email" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldWrapper fullWidth name="password" label="Введите пароль" />
                  </Grid>
                </Grid>
                <Button
                  className="submit-register"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Зарегистрироваться
                </Button>
              </Form>
            </Formik>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={ROUTES.LOGIN} variant="body2">
                  Уже есть аккаунт? Авторизуйтесь
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
