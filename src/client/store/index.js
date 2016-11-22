import { createStore, applyMiddleware } from 'redux';

import ReduxLogger from 'redux-logger';

const configureStore = applyMiddleware(
  ReduxLogger()
)(createStore);

export default configureStore;
