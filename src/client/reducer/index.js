import { combineReducers } from 'redux';

import { intlReducer } from 'react-intl-redux';

import { addLocaleData } from 'react-intl';

import { intlList, intlData } from '../../universal/intl';

intlList.map(item => {
  addLocaleData(intlData[item]);
  return item;
});

const reducer = combineReducers({
  intl: intlReducer
});

export default reducer;
