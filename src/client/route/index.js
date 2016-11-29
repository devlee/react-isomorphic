import React from 'react';

import { Route, IndexRoute, Redirect } from 'react-router';

import App from '../component/App';

import Home from '../container/Home';

import About from '../container/About';

import Demo from '../container/Demo';

import DemoItem from '../component/DemoItem';

const route = () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Redirect from="home" to="/" />
      <Route path="about" component={About} />
      <Route path="demo" component={Demo}>
        <Route path=":demoId" component={DemoItem} />
      </Route>
    </Route>
  );
};

export default route;
