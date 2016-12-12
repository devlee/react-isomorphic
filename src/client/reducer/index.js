import { combineReducers } from 'redux';

import { intlReducer } from 'react-intl-redux';

import { addLocaleData } from 'react-intl';

import { intlList, intlData } from '../../universal/intl';

import socket from './socket';

import test from './test';

intlList.map(item => {
  addLocaleData(intlData[item]);
  return item;
});

const reducer = combineReducers({
  intl: intlReducer,
  socket,
  test
});

export default reducer;
