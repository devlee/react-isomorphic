import { TEST_REQUEST, testResponse } from '../action';

export default function (action$) {
  return action$
    .ofType(TEST_REQUEST)
    .delay(1000)
    .mapTo(testResponse());
}
