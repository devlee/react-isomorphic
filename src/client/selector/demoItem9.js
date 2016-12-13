import { createSelector } from 'reselect';

import { testRequest, testCancel } from '../action';

const testSelector = state => state.test;

export default createSelector(
  testSelector,
  test => {
    return {
      testCount: test.count,
      testFetching: test.fetching,
      testRequest,
      testCancel
    };
  }
);
