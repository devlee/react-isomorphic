import { combineEpics } from 'redux-observable';

import test from './test';

const epic = combineEpics(
  test
);

export default epic;
