import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';

import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import selectedAddress from 'redux/address/selector';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import './i18n/i18n';

import routes, { routeURLs } from 'constants/routes';

import './App.css';
import selectAuthentication from 'redux/authentication/selector';

const App = () => {
  const { address } = useAppSelector(selectedAddress.getAddress);
  const { authenticationToken } = useAppSelector(selectAuthentication.getAuthenticationToken);

  const route = address || authenticationToken ? routes.privateRoutes : routes.publicRoutes;

  return (
    <Router>
      <Switch>
        {route.map((route) => {
          const Component = route?.component || Fragment;
          const Layout = Fragment;

          return (
            <Route
              path={route.path}
              key={route.path}
              exact={route.exact}
              render={(props: any) => <Layout>{<Component {...props} />}</Layout>}
            />
          );
        })}
      </Switch>
    </Router>
  );
};

export default withTranslation()(App);
