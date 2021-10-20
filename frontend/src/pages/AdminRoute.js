import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({component: Component, ...rest}) => {

  const { user } = useSelector(state => state.user)

  return (
      <Route {...rest} render={props => (
          user?.isAdmin ?
              <Component {...props} />
              : <Redirect to="/" />
      )} />
  );
};

export default AdminRoute;
