import io from 'socket.io-client';

import log from '../../universal/socket-log';

const socket = {};

let ioInstance = null;

const emit = (event, data) => {
  log({
    event,
    data,
    type: 'emit'
  });
  ioInstance.emit(event, data);
};

socket.init = () => {
  ioInstance = io();

  emit('data', {
    devlee: 'io'
  });
};

export default socket;
