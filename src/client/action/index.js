export const SOCKET_EMIT_REQUEST = 'SOCKET_EMIT_REQUEST';

export const SOCKET_ON_RESPONSE = 'SOCKET_ON_RESPONSE';

export const TEST_REQUEST = 'TEST_REQUEST';

export const TEST_RESPONSE = 'TEST_RESPONSE';

export const TEST_CANCEL = 'TEST_CANCEL';

export const TEST_ERROR = 'TEST_ERROR';

export function testRequest() {
  return {
    type: TEST_REQUEST
  };
}

export function testResponse() {
  return {
    type: TEST_RESPONSE
  };
}

export function testCancel() {
  return {
    type: TEST_CANCEL
  };
}

export function testError() {
  return {
    type: TEST_ERROR
  };
}
