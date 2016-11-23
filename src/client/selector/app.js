import { createSelector } from 'reselect';

const userAgentSelector = state => state.muiUserAgent || {};

export default createSelector(
  userAgentSelector,
  userAgent => {
    return {
      muiUserAgent: userAgent.value || 'all'
    };
  }
);
