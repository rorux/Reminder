import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Screens from '../screens';
import MainRoute from './MainRoute';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { ROUTES } from './constants';
import { IRouteProps } from './types';

const Router: React.FC<IRouteProps> = ({ authed }) => {
  return (
    <Switch>
      <MainRoute exact authed={authed} path={ROUTES.MAIN} />
      <PrivateRoute exact authed={authed} path={ROUTES.CALENDAR}>
        <Screens.Calendar />
      </PrivateRoute>
      <PrivateRoute exact authed={authed} path={ROUTES.DASHBOARD}>
        <Screens.Dashboard />
      </PrivateRoute>
      <PublicRoute exact authed={authed} path={ROUTES.LOGIN}>
        <Screens.Login />
      </PublicRoute>
      <PublicRoute exact authed={authed} path={ROUTES.REGISTER}>
        <Screens.Register />
      </PublicRoute>
      <Route path={ROUTES.NOT_FOUND}>
        <Screens.NotFound />
      </Route>
      <Route>
        <Redirect to={ROUTES.NOT_FOUND} />
      </Route>
    </Switch>
  );
};

export default Router;
