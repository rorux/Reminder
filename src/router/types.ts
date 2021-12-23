import { RouteProps } from 'react-router-dom';

export interface IRouteProps extends RouteProps {
  authed: boolean | null;
}

export enum ROUTES {
  MAIN = '/',
  DASHBOARD = '/dashboard',
  CALENDAR = '/calendar',
  LOGIN = '/login',
  REGISTER = '/register',
  NOT_FOUND = '/not-found',
}
