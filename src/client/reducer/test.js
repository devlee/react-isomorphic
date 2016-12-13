import { TEST_REQUEST, TEST_RESPONSE, TEST_CANCEL, TEST_ERROR } from '../action';

export default function (state = {
  count: 0,
  fetching: false
}, action) {
  switch (action.type) {
    case TEST_REQUEST: {
      return {
        count: state.count,
        fetching: true
      };
    }
    case TEST_RESPONSE: {
      return {
        count: state.count + 1,
        fetching: false
      };
    }
    case TEST_CANCEL: {
      return {
        count: state.count,
        fetching: false
      };
    }
    case TEST_ERROR: {
      return {
        count: state.count,
        fetching: false
      };
    }
    default:
      return state;
  }
}
