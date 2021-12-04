import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ROUTES } from './constants';
import { IRouteProps } from './types';

const PublicRoute = (props: IRouteProps) => {
  const { authed, component: Component, children, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !authed ? (
          Component ? (
            <Component {...routeProps} />
          ) : (
            children
          )
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.CALENDAR,
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default PublicRoute;
