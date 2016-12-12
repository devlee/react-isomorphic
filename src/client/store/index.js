import 'rxjs';

import { createStore, applyMiddleware, compose } from 'redux';

import { createEpicMiddleware } from 'redux-observable';

import ReduxLogger from 'redux-logger';

import { isDev, isClient } from '../../universal/env';

import epic from '../epic';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = isClient ?
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) :
  compose;

const logger = ReduxLogger();

const epicMiddleware = createEpicMiddleware(epic);

const configureStore = isDev ?
  composeEnhancers(applyMiddleware(
    epicMiddleware,
    logger
  ))(createStore) :
  applyMiddleware(
    epicMiddleware,
    logger
  )(createStore);

export default configureStore;
