import { RouteProps } from 'react-router-dom';

export interface IRouteProps extends RouteProps {
  authed: boolean | null;
}
