import React from 'react';
import { Redirect } from 'react-router-dom';

import Login from 'pages/login';
import Home from 'pages/home';

export const routeURLs = {
  LOGIN: '/login',
  HOME: '/',
};

const routes = {
  privateRoutes: [
    {
      name: 'Home',
      path: routeURLs.HOME,
      component: Home,
      exact: true,
    },
  ],
  publicRoutes: [
    {
      name: 'Home',
      path: routeURLs.HOME,
      component: Home,
      exact: true,
    },
  ],
};

export default routes;
