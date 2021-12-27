import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import { ROUTES } from '@router/types';
import './style.scss';

export default function Menu() {
  return (
    <>
      <Link to={ROUTES.CALENDAR}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Календарь" />
        </ListItem>
      </Link>
      <Link to={ROUTES.DASHBOARD}>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Напоминания" />
        </ListItem>
      </Link>
      <Link to={ROUTES.PROFILE}>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Профиль" />
        </ListItem>
      </Link>
    </>
  );
}
