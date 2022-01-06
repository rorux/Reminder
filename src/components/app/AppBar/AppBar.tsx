import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Logout } from '@mui/icons-material';
import { appSelector } from '@store/app/selectors';
import { drawerToggleAction } from '@store/app/actions';
import { ROUTES, ROUTES_NAME } from '@router/types';
import { getEnumKeyByEnumValue, getEnumValueByEnumKey } from '@utils/funcs';
import { authLogoutAction } from '@store/auth/actions';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AppBar() {
  const { isDrawerOpen } = useSelector(appSelector);
  const dispatch = useDispatch();

  const location = useLocation().pathname;

  let title = '';

  if (location.substring(1, 5) === 'edit') {
    title = 'Редактирование записи';
  } else {
    const routeKey = getEnumKeyByEnumValue(ROUTES, location);
    title = getEnumValueByEnumKey(ROUTES_NAME, routeKey);
  }

  const toggleDrawer = useCallback(() => {
    dispatch(drawerToggleAction());
  }, [dispatch]);

  const handlerLogout = useCallback(() => {
    dispatch(authLogoutAction());
  }, [dispatch]);

  return (
    <AppBarStyled position="absolute" open={isDrawerOpen}>
      <Toolbar
        sx={{
          pr: '24px',
        }}
      >
        <IconButton
          data-test="toggle-drawer"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(isDrawerOpen && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton data-test="logout" aria-label="logout" onClick={handlerLogout}>
          <Logout sx={{ color: 'white' }} />
        </IconButton>
      </Toolbar>
    </AppBarStyled>
  );
}
