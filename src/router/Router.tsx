import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import MainRoute from './MainRoute';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { IRouteProps, ROUTES } from './types';

const PageLayout = React.lazy(() => import('@screens/PageLayout'));
const Login = React.lazy(() => import('@screens/Login'));
const Register = React.lazy(() => import('@screens/Register'));
const NotFound = React.lazy(() => import('@screens/NotFound'));

export const Calendar = React.lazy(() => import('@components/containers/Calendar'));
export const Dashboard = React.lazy(() => import('@components/containers/Dashboard'));
export const Profile = React.lazy(() => import('@components/containers/Profile'));
export const RecordCreate = React.lazy(() => import('@components/containers/RecordCreate'));
export const RecordEdit = React.lazy(() => import('@components/containers/RecordEdit'));

export type TReactLazy = typeof Calendar;

const Router: React.FC<IRouteProps> = ({ authed }) => {
  return (
    <Switch>
      <MainRoute exact authed={authed} path={ROUTES.MAIN} />
      <PrivateRoute exact authed={authed} path={ROUTES.CALENDAR}>
        <Suspense fallback={<CircularProgress />}>
          <PageLayout component={Calendar} />
        </Suspense>
      </PrivateRoute>
      <PrivateRoute exact authed={authed} path={ROUTES.DASHBOARD}>
        <Suspense fallback={<CircularProgress />}>
          <PageLayout component={Dashboard} />
        </Suspense>
      </PrivateRoute>
      <PrivateRoute exact authed={authed} path={ROUTES.PROFILE}>
        <Suspense fallback={<CircularProgress />}>
          <PageLayout component={Profile} />
        </Suspense>
      </PrivateRoute>
      <PrivateRoute exact authed={authed} path={ROUTES.CREATE_RECORD}>
        <Suspense fallback={<CircularProgress />}>
          <PageLayout component={RecordCreate} />
        </Suspense>
      </PrivateRoute>
      <PrivateRoute exact authed={authed} path={ROUTES.EDIT_RECORD}>
        <Suspense fallback={<CircularProgress />}>
          <PageLayout component={RecordEdit} />
        </Suspense>
      </PrivateRoute>
      <PublicRoute exact authed={authed} path={ROUTES.LOGIN}>
        <Suspense fallback={<CircularProgress />}>
          <Login />
        </Suspense>
      </PublicRoute>
      <PublicRoute exact authed={authed} path={ROUTES.REGISTER}>
        <Suspense fallback={<CircularProgress />}>
          <Register />
        </Suspense>
      </PublicRoute>
      <Route path={ROUTES.NOT_FOUND}>
        <Suspense fallback={<CircularProgress />}>
          <NotFound />
        </Suspense>
      </Route>
      <Route>
        <Redirect to={ROUTES.NOT_FOUND} />
      </Route>
    </Switch>
  );
};

export default Router;
