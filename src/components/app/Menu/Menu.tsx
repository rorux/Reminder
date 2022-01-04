import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import { ROUTES } from '@router/types';
import './style.scss';

export default function Menu() {
  const location = useLocation().pathname;

  return (
    <>
      <Link to={ROUTES.CALENDAR}>
        <ListItem button selected={location === ROUTES.CALENDAR}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Календарь" />
        </ListItem>
      </Link>
      <Link to={ROUTES.DASHBOARD}>
        <ListItem
          button
          selected={location === ROUTES.DASHBOARD || location.substring(1, 5) === 'edit'}
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Напоминания" />
        </ListItem>
      </Link>
      <Link to={ROUTES.PROFILE}>
        <ListItem button selected={location === ROUTES.PROFILE}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Профиль" />
        </ListItem>
      </Link>
    </>
  );
}
