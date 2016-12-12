import { TEST_REQUEST, TEST_RESPONSE } from '../action';

export default function (state = {
  count: 0
}, action) {
  switch (action.type) {
    case TEST_REQUEST: {
      return {
        count: state.count + 1
      };
    }
    case TEST_RESPONSE: {
      return {
        count: state.count - 1
      };
    }
    default:
      return state;
  }
}
