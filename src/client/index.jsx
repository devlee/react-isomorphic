import React from 'react';

import { render } from 'react-dom';

import { Router, browserHistory } from 'react-router';

import { Provider } from 'react-intl-redux';

import { isDev } from '../universal/env';

import configureStore from './store';

import route from './route';

import reducer from './reducer';

window.onload = () => {
  /* eslint-disable no-underscore-dangle */
  const store = configureStore(
    reducer,
    window.__INITIAL_STATE__,
    isDev && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  const state = store.getState();

  render(
    <Provider store={store}>
      <Router history={browserHistory}>
        {route(state)}
      </Router>
    </Provider>,
    document.getElementById('app')
  );
};
