import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ROUTES } from './constants';
import { IRouteProps } from './types';

const MainRoute = (props: IRouteProps) => {
  const { authed, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        authed ? (
          <Redirect
            to={{
              pathname: ROUTES.CALENDAR,
              state: { from: routeProps.location },
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.LOGIN,
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default MainRoute;
