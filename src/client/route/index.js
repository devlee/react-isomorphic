import React from 'react';

import { Route, IndexRoute, Redirect } from 'react-router';

import App from '../component/App';

import Home from '../container/Home';

import About from '../container/About';

const route = () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Redirect from="home" to="/" />
      <Route path="about" component={About} />
    </Route>
  );
};

export default route;
