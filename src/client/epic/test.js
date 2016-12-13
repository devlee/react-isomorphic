import { Observable } from 'rxjs/Observable';

import { TEST_REQUEST, TEST_CANCEL, testResponse } from '../action';

import socket from '../socket';

export default function (action$) {
  return action$
    .ofType(TEST_REQUEST)
    .switchMap(() => {
      socket.emit('data', {
        test: 'io'
      });
      return Observable
        .fromEvent(socket.io, 'data')
        .filter(data => typeof data.test !== 'undefined')
        .delay(800)
        .mapTo(testResponse())
        .takeUntil(action$.ofType(TEST_CANCEL));
    });
}
