import { createSelector } from 'reselect';

const intlSelector = state => state.intl;

export default createSelector(
  intlSelector,
  intl => {
    return {
      langPack: intl.pack
    };
  }
);
