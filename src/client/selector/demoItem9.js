import { createSelector } from 'reselect';

const testSelector = state => state.test;

export default createSelector(
  testSelector,
  test => {
    return {
      testCount: test.count
    };
  }
);
