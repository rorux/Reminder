import React from 'react';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { ROUTES } from '@router/types';

const Dashboard = () => {
  return (
    <div data-test="dashboard">
      <Link to={ROUTES.CREATE_RECORD}>
        <Fab size="medium" color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
};

export default Dashboard;
