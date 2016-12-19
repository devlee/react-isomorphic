import React from 'react';

import { render } from 'react-dom';

import { Router, browserHistory } from 'react-router';

import { Provider } from 'react-intl-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store';

import route from './route';

import reducer from './reducer';

// import socket from './socket'; // TODO SSL

import sw from './service-worker';

window.onload = () => {
  /* eslint-disable no-underscore-dangle */
  sw.init();

  // socket.init(); // TODO SSL

  const store = configureStore(
    reducer,
    window.__INITIAL_STATE__
  );

  const state = store.getState();

  injectTapEventPlugin();

  render(
    <Provider store={store}>
      <Router history={browserHistory}>
        {route(state)}
      </Router>
    </Provider>,
    document.getElementById('app')
  );
};
