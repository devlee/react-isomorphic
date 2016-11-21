import React from 'react';

import { render } from 'react-dom';

import { Router, browserHistory } from 'react-router';

import route from './route';

window.onload = () => {
  render(
    <Router history={browserHistory}>
      {route()}
    </Router>,
    document.getElementById('app')
  );
};
