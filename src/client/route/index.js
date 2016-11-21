import React from 'react';

import { Route, IndexRoute } from 'react-router';

import App from '../component/App';

import Home from '../container/Home';

const route = () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
    </Route>
  );
};

export default route;
