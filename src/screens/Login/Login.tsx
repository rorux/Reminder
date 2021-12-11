import * as React from 'react';
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
import { ROUTES } from '@router/constants';
import TextFieldWrapper from '@components/formsUI/TextField';

const theme = createTheme();

const INITIAL_FORM_STATE = {
  email: '',
  password: '',
};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email('Некорректный email!').required('Введите, пожалуйста, email!'),
  password: Yup.string()
    .required('Введите, пожалуйста, пароль!')
    .min(3, 'Пароль от 3-х символов!')
    .max(20, 'Пароль не более 20 символов!'),
});

type TValues = {
  email: string;
  password: string;
};

export default function Login() {
  const handleSubmit = (values: TValues): void => {
    console.log(values);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" data-test="loginComponent" className="loginn">
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
            Авторизация
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={handleSubmit}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextFieldWrapper fullWidth name="email" label="Введите email" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldWrapper fullWidth name="password" label="Введите пароль" />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Войти
                </Button>
              </Form>
            </Formik>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={ROUTES.REGISTER} variant="body2">
                  Нет аккаунта? Зарегистрируйтесь
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
