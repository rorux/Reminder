import React, { Suspense } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';
import AppBar from '@components/app/AppBar';
import Drawer from '@components/app/Drawer';
import { TReactLazy } from '@router/Router';

const mdTheme = createTheme();

type TPageLayoutProps = {
  component: TReactLazy;
};

const PageLayout: React.FC<TPageLayoutProps> = ({ component }) => {
  const Component = component;

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar />
        <Drawer />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Suspense fallback={<CircularProgress />}>
                  <Component />
                </Suspense>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PageLayout;
