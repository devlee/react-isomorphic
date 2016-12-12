import { SOCKET_EMIT_REQUEST } from '../action';

export default function (state = {
  emitCount: 0,
  onCount: 0
}, action) {
  switch (action.type) {
    case SOCKET_EMIT_REQUEST: {
      return state;
    }
    default:
      return state;
  }
}
